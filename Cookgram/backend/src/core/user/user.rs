use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::{entity::Entity, meta::meta::Meta};

#[derive(PartialEq)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    password: String,
    pub email: String,
    pub meta: Meta,
}

impl Entity for User {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}

impl User {
    pub fn new(username: String, password: String, email: String) -> Self {
        Self {
            id: User::generate_id(),
            username,
            password,
            email,
            meta: Meta::new()
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
            Date::from_iso_week_date(2024, 10,time::Weekday::Monday).expect("Invalid date")
        }
    }
    #[test]
    fn generate_id_test() {
        let id = User::generate_id();
        assert!(id.to_string().len() > 10)
    }
    
    #[test]
    fn test_generate_id() {
        // Generate two UUIDs
        let id1 = User::generate_id();
        let id2 = User::generate_id();

        // Check if the UUIDs are different
        assert_ne!(id1, id2);
    }

    #[test]
    fn test_fields() {
        let offset_date_time = MockOffsetDateTime::now_utc();

        // Create a new user
        let user = User::new(
            "test_user".to_string(),
            "password123".to_string(),
            "test@example.com".to_string(),
        );

        assert_ne!(user.id, Uuid::nil());

        assert_eq!(user.username, "test_user");
        assert_eq!(user.password, "password123");
        assert_eq!(user.email, "test@example.com");

        assert_eq!(user.meta.create_date.year(), 2024);
        assert_eq!(user.meta.create_date.month(), Month::March);
        assert_eq!(user.meta.create_date.day(), 30); // Day is set to 1 for example
        assert_eq!(user.meta.edit_date, user.meta.create_date);
    }
}

