use uuid::Uuid;

use crate::core::{entity::Entity, meta::meta::Meta, recipie::recipie::Recipie};

#[derive(PartialEq)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    password: String,
    pub email: String,
    pub recipies: Option<Vec<Recipie>>,
    pub meta: Meta,
}

impl Entity for User {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}

impl User {
    pub fn new(
        id: Option<Uuid>,
        username: String,
        password: String,
        email: String,
        recipies: Option<Vec<Recipie>>,
    ) -> Self {
        let recipies: Option<Vec<Recipie>> = match recipies {
            Some(r)=> Some(r),
            None => Some(vec![])
        };
        match id {
            Some(id) => Self {
                id,
                username,
                password,
                email,
                recipies,
                meta: Meta::new(),
            },
            None => Self {
                id: User::generate_id(),
                username,
                password,
                email,
                recipies,
                meta: Meta::new(),
            },
        }
    }
}

#[cfg(test)]
mod tests {
    use time::{Date, Month};

    use super::*;

    struct MockOffsetDateTime;

    impl MockOffsetDateTime {
        fn now_utc() -> Self {
            MockOffsetDateTime
        }

        fn date(&self) -> Date {
            Date::from_iso_week_date(2024, 10, time::Weekday::Monday).expect("Invalid date")
        }
    }
    #[test]
    fn generate_id_test() {
        let id = User::generate_id();
        assert!(id.to_string().len() > 10)
    }

    #[test]
    fn test_generate_id() {
        let id1 = User::generate_id();
        let id2 = User::generate_id();

        assert_ne!(id1, id2);
    }

    #[test]
    fn test_fields() {
        let offset_date_time = MockOffsetDateTime::now_utc();

        // Create a new user
        let user = User::new(
            None,
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
            Some(vec![])
        );

        assert_ne!(user.id, Uuid::nil());

        assert_eq!(user.username, "test_user");
        assert_eq!(user.password, "password123");
        assert_eq!(user.email, "test@example.com");

        assert_eq!(user.meta.create_date.year(), 2024);
        assert_eq!(user.meta.create_date.month(), Month::March);
        assert_eq!(user.meta.create_date.day(), 31); // Day is set to 1 for example
        assert_eq!(user.meta.edit_date, user.meta.create_date);
    }

    #[test]
    fn test_user_new_with_id() {
        // Set up a mock OffsetDateTime for testing
        let offset_date_time = MockOffsetDateTime::now_utc();

        // Create a new user with a specific id
        let user_id = Uuid::new_v4();
        let user = User::new(
            Some(user_id),
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
            None,
        );

        // Check if the user has the correct id
        assert_eq!(user.id, user_id);

        // Check if the username, password, and email are set correctly
        assert_eq!(user.username, "test_user");
        assert_eq!(user.password, "password123");
        assert_eq!(user.email, "test@example.com");

        // Check if the meta field is initialized correctly
        assert_eq!(user.meta.create_date.year(), 2024);
        assert_eq!(user.meta.create_date.month(), Month::March);
        assert_eq!(user.meta.create_date.day(), 31); // Day is set to 1 for example
        assert_eq!(user.meta.edit_date, user.meta.create_date);
    }

    #[test]
    fn test_user_new_with_id_and_recipies() {
        // Create some recipies for testing
        let recipie1 = Recipie::new(None, "Recipie 1".to_string());
        let recipie2 = Recipie::new(None, "Recipie 2".to_string());

        // Create a new user with a specific id and recipies
        let user_id = Uuid::new_v4();
        let user = User::new(
            Some(user_id),
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
            Some(vec![recipie1, recipie2]),
        );

        // Check if the user has the correct id
        assert_eq!(user.id, user_id);

        // Check if the username, password, and email are set correctly
        assert_eq!(user.username, "test_user");
        assert_eq!(user.password, "password123");
        assert_eq!(user.email, "test@example.com");

        // Check if the recipies are set correctly
        assert_eq!(user.recipies.unwrap().len(), 2);

        // Check if the meta field is initialized correctly
        assert_eq!(user.meta.edit_date, user.meta.create_date);
    }

    // Test the new function of the User struct without an id and without recipies
    #[test]
    fn test_user_new_without_id_and_without_recipies() {
        // Create a new user without a specific id and without recipies
        let user = User::new(
            None,
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
            None,
        );

        // Check if the user has a UUID id
        assert_ne!(user.id, Uuid::nil());

        // Check if the username, password, and email are set correctly
        assert_eq!(user.username, "test_user");
        assert_eq!(user.password, "password123");
        assert_eq!(user.email, "test@example.com");

        // Check if the recipies are initialized as an empty vector
        assert_eq!(user.recipies.unwrap().len(), 0);

        // Check if the meta field is initialized correctly
        assert_eq!(user.meta.edit_date, user.meta.create_date);
    }
}
