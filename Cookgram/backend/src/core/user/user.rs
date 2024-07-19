use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::{
    address::address::Address,
    entity::Entity,
    meta::meta::Meta,
    role::{
        role::{Role, Roles},
        userrole::UserRole,
    },
    state::{entitystate::EntityState, state::State},
    usercontract::usercontract::Contract,
};

use super::{credentials::Credentials, personalinformation::PersonalInformation};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    // pub first_name: Option<String>,
    // pub last_name: Option<String>,
    pub personal_information: PersonalInformation,
    pub credentials: Credentials,
    pub address: Option<Address>,
    pub meta: Meta,
    pub role: Roles,
    pub state: State<EntityState>,
}

impl Entity for User {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}

impl User {
    pub fn new(
        id: Option<Uuid>,
        personal_information: PersonalInformation,
        credentials: Credentials,
        role: Option<Roles>,
        meta: Option<Meta>,
    ) -> Self {
        let user_role: Roles = User::prepare_proper_role(role);
        match id {
            Some(id) => Self {
                id,
                personal_information,
                credentials,
                meta: meta.unwrap_or(Meta::new()),
                role: user_role,
                address: None,
                state: State {
                    current: EntityState::Active,
                    previous: None,
                },
            },
            None => Self {
                id: User::generate_id(),
                personal_information,
                credentials,
                meta: Meta::new(),
                role: user_role,
                address: None,
                state: State {
                    current: EntityState::Active,
                    previous: None,
                },
            },
        }
    }

    fn prepare_proper_role(role: Option<Roles>) -> Roles {
        match role {
            Some(r) => match r {
                Roles::User(_) => Roles::user_role(),
                Roles::Admin(_) => Roles::admin_role(),
                Roles::SuperAdmin(_) => Roles::super_admin_role(),
                Roles::Employee(_) => Roles::employee_role(),
                Roles::Manager(_) => Roles::manager_role(),
                Roles::Director(_) => Roles::director_role(),
            },
            None => Roles::User(UserRole::default()),
        }
    }

    pub fn create_base_on_user_and_address(user: User, address: Address) -> User {
        User {
            address: Some(address),
            ..user
        }
    }
}

#[cfg(test)]
mod tests {
    use serde_json::json;
    use time::{Date, Month, OffsetDateTime};

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
            PersonalInformation {
                first_name: None,
                last_name: None,
                brithday: OffsetDateTime::now_utc(),
                email: None,
                gender: None,
            },
            Credentials::new("test_user".to_string(), "password123".to_string()),
            Some(Roles::admin_role()),
            None,
        );

        assert_ne!(user.id, Uuid::nil());

        assert_eq!(user.credentials.username, "test_user");
        //assert_eq!(user.password, "password123");
        assert_eq!(user.personal_information.email.unwrap(), "test@example.com");
        assert_eq!(user.role, Roles::admin_role());
        assert_eq!(user.meta.create_date.year(), 2024);
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
            PersonalInformation {
                first_name: None,
                last_name: None,
                brithday: OffsetDateTime::now_utc(),
                email: Some("test@example.com".to_string()),
                gender: None,
            },
            Credentials::new("test_user".to_string(), "password123".to_string()),
            Some(Roles::user_role()),
            None,
        );

        // Check if the user has the correct id
        assert_eq!(user.id, user_id);

        // Check if the username, password, and email are set correctly
        assert_eq!(user.credentials.username, "test_user");
        //assert_eq!(user.password, "password123"); TODO: fix after hash
        assert_eq!(user.personal_information.email.unwrap(), "test@example.com");
        assert_eq!(user.role, Roles::user_role());

        // Check if the meta field is initialized correctly
        assert_eq!(user.meta.create_date.year(), 2024);
        assert_eq!(user.meta.edit_date, user.meta.create_date);
    }

    #[test]
    fn test_user_new_with_id_and_recipies() {
        // Create a new user with a specific id and recipies
        let user_id = Uuid::new_v4();
        let user = User::new(
            Some(user_id),
            PersonalInformation {
                first_name: None,
                last_name: None,
                brithday: OffsetDateTime::now_utc(),
                email: Some("test@example.com".to_string()),
                gender: None,
            },
            Credentials::new("test_user".to_string(), "password123".to_string()),
            None,
            None,
        );

        // Check if the user has the correct id
        assert_eq!(user.id, user_id);

        // Check if the username, password, and email are set correctly
        assert_eq!(user.credentials.username, "test_user");
        //assert_eq!(user.password, "password123");
        assert_eq!(user.personal_information.email.unwrap(), "test@example.com");

        // Check if the recipies are set correctly

        // Check if the meta field is initialized correctly
        assert_eq!(user.meta.edit_date, user.meta.create_date);
    }

    // Test the new function of the User struct without an id and without recipies
    #[test]
    fn test_user_new_without_id_and_without_recipies() {
        // Create a new user without a specific id and without recipies
        let user = User::new(
            None,
            PersonalInformation {
                first_name: None,
                last_name: None,
                brithday: OffsetDateTime::now_utc(),
                email: Some("test@example.com".to_string()),
                gender: None,
            },
            Credentials::new("test_user".to_string(), "password123".to_string()),
            None,
            None,
        );

        // Check if the user has a UUID id
        assert_ne!(user.id, Uuid::nil());

        // Check if the username, password, and email are set correctly
        assert_eq!(user.credentials.username, "test_user");
        //assert_eq!(user.password, "password123");
        assert_eq!(user.personal_information.email.unwrap(), "test@example.com");

        // Check if the meta field is initialized correctly
    }

    #[test]
    fn test_user_serialization() {
        let id = uuid::Uuid::new_v4();
        let date = OffsetDateTime::now_utc();
        // Create a sample user
        let user = User {
            id: uuid::Uuid::parse_str("d6fcdff0-0c94-42a8-8dd1-8d354c742046").unwrap(),
            personal_information: PersonalInformation {
                first_name: None,
                last_name: None,
                brithday: OffsetDateTime::now_utc(),
                email: Some(String::from("test@example.com")),
                gender: None,
            },
            credentials: Credentials::new("test_user".to_string(), "password123".to_string()),
            meta: Meta {
                id: uuid::Uuid::parse_str("d6fcdff0-0c94-42a8-8dd1-8d354c742046").unwrap(),
                create_date: date,
                edit_date: date,
            },
            role: Roles::User(UserRole::default()),
            address: None,
            state: State {
                current: EntityState::Active,
                previous: None,
            },
        };

        // Serialize the user to JSON
        let serialized_user = serde_json::to_value(&user).unwrap();

        // Define expected JSON
        let expected_json = json!({
            "id": "d6fcdff0-0c94-42a8-8dd1-8d354c742046",
            "username": "test_user",
            "email": "test@example.com",
            "recipies": [],
            "role": {
                "User": {},
            },
            "meta": {
                "create_date": date.to_string(),
                "edit_date":  date.to_string(),
            }
        });

        // Ensure serialization works as expected
        assert_eq!(serialized_user, expected_json);
    }

    #[test]
    fn test_user_deserialization() {
        // Sample JSON representing a user
        let date = OffsetDateTime::now_utc().date();
        let json = json!({
            "id": "d6fcdff0-0c94-42a8-8dd1-8d354c742046",
            "username": "test_user",
            "email": "test@example.com",
            "password": "123456",
            "role":{
                "User": {}
            },
            "recipies": [],
            "meta": {
                "id": "d6fcdff0-0c94-42a8-8dd1-8d354c742046",
                "create_date": date,
                "edit_date":  date,
            }
        })
        .to_string();

        // Deserialize the JSON into a User object
        let user: User = serde_json::from_str(&json).unwrap();

        // Ensure deserialization works as expected
        assert_eq!(user.credentials.username, "test_user");
        assert_eq!(user.personal_information.email.unwrap(), "test@example.com");
        // Add more assertions as needed...
    }
}
