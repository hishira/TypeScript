use crate::{
    api::{
        daos::{dao::DAO, userdao::UserDAO}, dtos::userdto::userdto::UserFilterOption, queries::{
            actionquery::ActionQueryBuilder, metaquery::metaquery::MetaQuery, query::Query,
            userquery::userquery::UserQuery,
        }, services::userservice::UserService
    },
    core::{
        address::address::Address,
        event::{
            event::{Event, EventType},
            userevent::UserEvent,
        },
        meta::meta::Meta,
        user::user::User,
    },
};
use mongodb::Database;
use sqlx::{postgres::PgQueryResult, Error, Pool, Postgres, Transaction};
use std::{borrow::Borrow, ops::DerefMut};
use time::OffsetDateTime;

use super::{eventrepository::EventRepository, repositories::Repository};

#[derive(Clone)]
pub struct UserRepositories {
    pub pool: Pool<Postgres>,
    pub user_queries: UserQuery,
    pub db_context: Database,
    pub user_dao: UserDAO,
}
impl UserRepositories {
    async fn create_user_using_transaction(
        &self,
        mut transaction: Transaction<'static, Postgres>,
        entity: User,
    ) -> User {
        let mut meta_query = MetaQuery::create(entity.meta.clone());
        let meta_response = meta_query.build().execute(transaction.deref_mut()).await;
        let re = self.user_dao.create(entity.clone(), Some(transaction.deref_mut())).await;
        UserRepositories::user_create_errors_handler(re, meta_response);
        let _ = transaction.commit().await;
        EventRepository::create_later(
            self.db_context.clone(),
            UserEvent::create_event(entity.id.clone()),
        );
        entity
    }

    fn user_create_errors_handler(
        re: Result<PgQueryResult, Error>,
        meta_response: Result<PgQueryResult, Error>,
    ) {
        match (re, meta_response) {
            (Ok(_), Ok(_)) => tracing::debug!("Meta and user created"),
            (Ok(_), Err(_)) => tracing::debug!("User created, meta not created"),
            (Err(_), Ok(_)) => tracing::debug!("User not created, meta created"),
            (Err(_), Err(_)) => tracing::debug!("Meta and user not created"),
        }
    }

    async fn create_user_address(&self, user: User, address: Address) -> User {
        let mut address_query = self
            .user_queries
            .prepare_address_query(address.clone(), user.id.clone());
        let result = address_query.build().execute(&self.pool).await;
        match result {
            Ok(_) => tracing::debug!("Address created"),
            Err(error) => tracing::error!("error while address create: {}", error),
        }
        EventRepository::create_later(
            self.db_context.clone(),
            UserEvent::update_event(user.id.clone())// Event::new(None, Some(EventType::Update), user.id.clone(), true),
        );
        User::create_base_on_user_and_address(user, address)
    }
}
impl Repository<User, UserFilterOption, sqlx::Error> for UserRepositories {
    async fn create(&self, entity: User) -> User {
        let transaction_res = self.pool.begin().await;
        match transaction_res {
            Ok(tranaction) => self.create_user_using_transaction(tranaction, entity).await,
            Err(error) => {
                tracing::error!("Error occur while user create, {}", error);
                entity
            }
        }
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> User {
        let mut find_by_id_query = self.user_queries.find_by_id(id);
        find_by_id_query
            .build()
            .map(UserService::get_user_from_row)
            .fetch_one(&self.pool)
            .await
            .unwrap()
    }

    async fn find(&self, option: UserFilterOption) -> Result<Vec<User>, sqlx::Error> {
        let mut find_query = self.user_queries.find(option);
        let result = find_query
            .build()
            .map(UserService::get_user_from_row)
            .fetch_all(&self.pool)
            .await;
        result
    }

    async fn delete(&self, entity: User) -> User {
        let mut delete_query = self.user_queries.delete(entity.clone());
        let delete_user_reponse = delete_query.build().execute(&self.pool).await;
        match delete_user_reponse {
            Ok(_) => {
                EventRepository::create_later(
                    self.db_context.clone(),
                    UserEvent::delete_event(entity.id.clone())
                );
                return entity;
            }
            Err(error) => {
                tracing::error!("error while user delete: {}", error);
                entity
            }
        }
    }

    async fn update(&self, update_entity: User) -> User {
        // For now change for address createtion
        let address_clone = update_entity.address.clone();
        if let Some(address) = address_clone {
            return self.create_user_address(update_entity, address).await;
        }
        let mut update_query = self.user_queries.update(update_entity.clone());
        let resp = update_query.build().execute(&self.pool).await;
        match resp {
            Ok(_) => tracing::debug!("User with id updated"),
            Err(error) => tracing::error!("Problem with user create, {}", error),
        }
        meta_update(self.pool.clone(), update_entity.clone());
        EventRepository::create_later(
            self.db_context.clone(),
            UserEvent::update_event(update_entity.id.clone())
        );
        return update_entity;
    }
}

// Working example of spaming meta
pub fn mete_create(postgres_pool: Pool<Postgres>, entity: User) {
    tokio::task::spawn(async move {
        let mut meta_query = MetaQuery::create(entity.meta.clone());
        let meta_query_result = meta_query.build().fetch_one(&postgres_pool).await;
        match meta_query_result {
            Ok(_) => tracing::debug!("Meta object created"),
            Err(error) => {
                tracing::debug!("Meta object not created, {}", error);
            }
        };
    });
}

pub fn meta_update(postgres_pool: Pool<Postgres>, entity: User) {
    tokio::task::spawn(async move {
        let mut meta_query = MetaQuery {}.update(Meta::based_on_edi_date(
            entity.meta.id,
            OffsetDateTime::now_utc(),
        ));
        let meta_query_result = meta_query.build().execute(&postgres_pool).await;
        match meta_query_result {
            Ok(_) => tracing::debug!("Meta object update"),
            Err(error) => {
                tracing::debug!("Meta object not update, {}", error);
            }
        };
    });
}
