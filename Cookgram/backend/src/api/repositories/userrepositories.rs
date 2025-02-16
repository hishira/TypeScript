use crate::{
    api::{
        daos::{authenticationdao::AuthenticationDAO, dao::DAO, useraddressdao::UserAddressDAO, userdao::UserDAO},
        dtos::userdto::userdto::UserFilterOption,
        queries::{
            actionquery::ActionQueryBuilder, metaquery::metaquery::MetaQuery,
            userquery::userquery::UserQuery,
        },
    },
    core::{
        address::address::Address, event::userevent::UserEvent, meta::meta::Meta, user::user::User,
    },
};
use mongodb::Database;
use sqlx::{postgres::PgQueryResult, Error, Pool, Postgres, Transaction};
use std::ops::DerefMut;
use time::OffsetDateTime;

use super::{eventrepository::EventRepository, repositories::Repository};

#[derive(Clone)]
pub struct UserRepositories {
    pub pool: Pool<Postgres>,
    pub user_queries: UserQuery,
    pub db_context: Database,
    pub user_dao: UserDAO,
    pub user_address_dao: UserAddressDAO,

}
impl UserRepositories {
    async fn create_user_using_transaction(
        &self,
        mut transaction: Transaction<'static, Postgres>,
        entity: User,
    ) -> User {
        let mut meta_query = MetaQuery::create(entity.meta.clone());
        let meta_response = meta_query.build().execute(transaction.deref_mut()).await;
        let re = self
            .user_dao
            .create(entity.clone(), Some(transaction.deref_mut()))
            .await;
        let address_resp: Option<Result<PgQueryResult, Error>>;
        if (entity.address.is_some()) {
            address_resp = Some(
                self.user_address_dao
                    .create(
                        entity.clone().address.unwrap(),
                        entity.clone().id.get_id(),
                        Some(transaction.deref_mut()),
                    )
                    .await,
            );
        } else {
            address_resp = None;
        }
        UserRepositories::user_create_errors_handler(re, meta_response, address_resp);
        let _ = transaction.commit().await;
        EventRepository::create_later(
            self.db_context.clone(),
            UserEvent::create_event(entity.id.get_id()),
        );
        entity
    }

    fn user_create_errors_handler(
        re: Result<PgQueryResult, Error>,
        meta_response: Result<PgQueryResult, Error>,
        address_resp: Option<Result<PgQueryResult, Error>>,
    ) {
        match (re, meta_response) {
            (Ok(_), Ok(_)) => tracing::debug!("Meta and user created"),
            (Ok(_), Err(_)) => tracing::debug!("User created, meta not created"),
            (Err(_), Ok(_)) => tracing::debug!("User not created, meta created"),
            (Err(_), Err(_)) => tracing::debug!("Meta and user not created"),
        }
        match address_resp {
            Some(resp) => match resp {
                Ok(_) => tracing::debug!("User address created"),
                Err(error) => tracing::error!("Error occur while saving user address {}", error),
            },
            None => {}
        }
    }

    async fn create_user_address(&self, user: User, address: Address) -> User {
        let result = self
            .user_address_dao
            .create(address.clone(), user.id.get_id(), Some(&self.pool))
            .await;
        match result {
            Ok(_) => tracing::debug!("Address created"),
            Err(error) => tracing::error!("error while address create: {}", error),
        }
        EventRepository::create_later(
            self.db_context.clone(),
            UserEvent::update_event(user.id.get_id()),
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
        self.user_dao.find_by_id(id).await.unwrap()
    }

    async fn find(&self, option: UserFilterOption) -> Result<Vec<User>, sqlx::Error> {
        self.user_dao.find(option).await
    }

    async fn delete(&self, entity: User) -> User {
        match self.user_dao.delete(entity.clone()).await {
            Ok(_) => {
                EventRepository::create_later(
                    self.db_context.clone(),
                    UserEvent::delete_event(entity.id.get_id()),
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
        let mut update_query = UserQuery::update(update_entity.clone());
        let resp = update_query.build().execute(&self.pool).await;
        match resp {
            Ok(_) => tracing::debug!("User with id updated"),
            Err(error) => tracing::error!("Problem with user create, {}", error),
        }
        meta_update(self.pool.clone(), update_entity.clone());
        EventRepository::create_later(
            self.db_context.clone(),
            UserEvent::update_event(update_entity.id.get_id()),
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
        let mut meta_query = MetaQuery::update(Meta::based_on_edi_date(
            entity.meta.id.get_id(),
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
