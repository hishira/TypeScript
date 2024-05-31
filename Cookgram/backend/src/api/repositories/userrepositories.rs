use crate::{
    api::{
        dtos::userdto::userdto::UserFilterOption,
        queries::{
            actionquery::ActionQueryBuilder, metaquery::metaquery::MetaQuery, query::Query,
            userquery::userquery::UserQuery,
        },
        services::userservice::UserService,
    },
    core::{
        address::address::Address, event::event::{Event, EventType}, user::user::User
    },
};
use sqlx::{Pool, Postgres, Transaction};
use std::ops::DerefMut;

use super::{eventrepository::EventRepository, repositories::Repository};

#[derive(Clone)]
pub struct UserRepositories {
    pub pool: Pool<Postgres>,
    pub user_queries: UserQuery,
}
impl UserRepositories {
    async fn create_user_using_transaction(
        &self,
        mut transaction: Transaction<'static, Postgres>,
        entity: User,
    ) -> User {
        let mut meta_query = MetaQuery {}.create(entity.meta.clone());
        let mut create_query = self.user_queries.create(entity.clone());
        let meta_response = meta_query.build().execute(transaction.deref_mut()).await;
        let re = create_query.build().execute(transaction.deref_mut()).await;
        match (re, meta_response) {
            (Ok(_), Ok(_)) => tracing::debug!("Meta and user created"),
            (Ok(_), Err(_)) => tracing::debug!("User created, meta not created"),
            (Err(_), Ok(_)) => tracing::debug!("User not created, meta created"),
            (Err(_), Err(_)) => tracing::debug!("Meta and user not created"),
        }
        let _ = transaction.commit().await;
        EventRepository::create_later(
            self.pool.clone(),
            Event::new(None, Some(EventType::Create), entity.id.clone(), true),
        );
        entity
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
        EventRepository::create_later(self.pool.clone(), Event::new(None, Some(EventType::Update),user.id.clone(),true));
        User::create_base_on_user_and_address(user, address)
    }
}
impl Repository<User, UserFilterOption> for UserRepositories {
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

    async fn find(&self, option: UserFilterOption) -> Vec<User> {
        let mut find_query = self.user_queries.find(option);
        let response = find_query
            .build()
            .map(UserService::get_user_from_row)
            .fetch_all(&self.pool)
            .await
            .unwrap();
        response
    }

    async fn delete(&self, entity: User) -> User {
        let mut delete_query = self.user_queries.delete(entity.clone());
        let delete_user_reponse = delete_query.build().execute(&self.pool).await;
        match delete_user_reponse {
            Ok(_) => entity,
            Err(error) => {
                tracing::error!("error while user delete: {}", error);
                entity
            }
        }
    }

    async fn update(&self, update_entity: User) -> User {
        // For now change for address createtion
        let address = update_entity.address.clone();
        self.create_user_address(update_entity, address.unwrap()).await
        // let mut update_query = self.user_queries.update(update_entity.clone());
        // match update_query.build().execute(&self.pool).await {
        //     Ok(_) => update_entity,
        //     Err(error) => {
        //         tracing::error!("Error while user update {}", error);
        //         update_entity
        //     }
        // }
    }
}

// Working example of spaming meta
pub fn mete_create(postgres_pool: Pool<Postgres>, entity: User) {
    tokio::task::spawn(async move {
        let mut meta_query = MetaQuery {}.create(entity.meta.clone());
        let meta_query_result = meta_query.build().fetch_one(&postgres_pool).await;
        match meta_query_result {
            Ok(_) => tracing::debug!("Meta object created"),
            Err(error) => {
                tracing::debug!("Meta object not created, {}", error);
            }
        };
    });
}
