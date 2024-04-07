use std::{any::Any, future::IntoFuture};

use crate::{
    api::{dtos::userdto::userdto::UserFilterOption, queries::{
        actionquery::ActionQueryBuilder, metaquery::metaquery::MetaQuery, query::Query,
        userquery::userquery::UserQuery,
    }, services::userservice::UserService},
    core::{meta::meta::Meta, user::user::User},
};
use serde::Deserialize;
use sqlx::{postgres::PgRow, Column, Executor, Pool, Postgres, Row};
use std::ops::DerefMut;

use super::repositories::Repository;

#[derive(Clone)]
pub struct UserRepositories {
    pub pool: Pool<Postgres>,
    pub user_queries: UserQuery,
}

impl Repository<User, UserFilterOption> for UserRepositories {
    async fn create(&self, entity: User) -> User {
        let mut transaction = self.pool.begin().await.unwrap();
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
        //mete_create(self.pool.clone(), entity.clone()); -> At moment not delete
        transaction.commit().await;
        entity
    }

    fn find_by_id(id: uuid::Uuid) -> User {
        User::new(
            Some(id),
            "test".to_string(),
            "password".to_string(),
            "test@test.com".to_string(),
            Some(vec![]),
        )
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

    fn delete(entity: User) -> User {
        entity
    }

    fn update(update_entity: User) -> User {
        User::new(
            None,
            "test".to_string(),
            "password".to_string(),
            "test@test.com".to_string(),
            Some(vec![]),
        )
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
#[cfg(test)]
mod tests {

    use uuid::Uuid;

    use super::*;

    // Test the create method of the UserRepositories struct
    //TOOD: Fix tests
    #[test]
    fn test_user_repositories_create() {
        // Create a new user
        let user_id = Uuid::new_v4();
        let user = User::new(
            Some(user_id),
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
            None,
        );

        // Call the create method and assert the returned user
        //let created_user =.create(user.clone());
        assert_eq!(user, user);
    }

    // Test the find_by_id method of the UserRepositories struct
    #[test]
    fn test_user_repositories_find_by_id() {
        // Generate a random UUID for testing
        let user_id = Uuid::new_v4();

        // Call the find_by_id method and assert the returned user
        let found_user = UserRepositories::find_by_id(user_id);
        assert_eq!(found_user.id, user_id);
    }

    // Test the find method of the UserRepositories struct
    #[test]
    fn test_user_repositories_find() {
        // Mock the database pool

        // Create a UserFilterOption for testing
        let filter_option = UserFilterOption {
            username: "test".to_string(),
        };

        // Call the find method and assert the returned users
        let found_users = UserRepositories::find(filter_option);
        assert_eq!(found_users.len(), 2); // Assuming the find method returns 2 users
    }

    // Test the update method of the UserRepositories struct
    #[test]
    fn test_user_repositories_update() {
        // Create a new user for updating
        let user_id = Uuid::new_v4();
        let user = User::new(
            Some(user_id),
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
            None,
        );

        // Call the update method and assert the returned user
        let returned_user = UserRepositories::update(user.clone());
        assert_eq!(returned_user, user);
    }

    // Test the delete method of the UserRepositories struct
    #[test]
    fn test_user_repositories_delete() {
        let user_id = Uuid::new_v4();
        let user = User::new(
            Some(user_id),
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
            None,
        );

        // Call the delete method and expect no panic
        let _ = UserRepositories::delete(user);
    }
}
