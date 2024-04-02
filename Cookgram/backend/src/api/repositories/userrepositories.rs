use sqlx::{Pool, Postgres};

use crate::{
    api::{
        dtos::userdto::userdto::UserDtos,
        queries::{actionquery::ActionQuery, userquery::userquery::UserQuery},
    },
    core::{entity::Entity, user::user::User},
};

use super::repositories::Repository;

#[derive(Clone)]
pub struct UserRepositories {
    pub pool: Pool<Postgres>,
    pub user_queries: UserQuery,
}

trait Filter: Send + Sync {}

#[derive(Clone)]
pub struct UserFilterOption {
    pub username: String,
}

impl  Filter for UserFilterOption {
    
}

impl Repository<User, UserFilterOption> for UserRepositories {
    async fn create(&self, entity: User) -> User {
        let mut create_query = self.user_queries.create(entity.clone());
        let re = create_query.build().fetch_one(&self.pool).await;
        match re{
            Ok(row) => {
                println!("OK");
            },
            Err(e)=>{
                println!("{}", e);
            }
        }
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

    fn find(option: UserFilterOption) -> Vec<User> {
        vec![
            User::new(
                None,
                "test".to_string(),
                "password".to_string(),
                "test@test.com".to_string(),
                Some(vec![]),
            ),
            User::new(
                None,
                "test".to_string(),
                "password".to_string(),
                "test@test.com".to_string(),
                Some(vec![]),
            ),
        ]
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

#[cfg(test)]
mod tests {

    use uuid::Uuid;

    use super::*;

    // Test the create method of the UserRepositories struct
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
        let created_user = UserRepositories::create(user.clone());
        assert_eq!(created_user, user);
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
