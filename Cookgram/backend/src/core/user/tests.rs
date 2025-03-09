#[cfg(test)]
mod tests {
    use time::{Date, OffsetDateTime};
    use uuid::Uuid;

    use crate::core::{entity::{entity::IdGenerator, Entity}, role::role::Roles, user::{contact::Contacts, credentials::Credentials, personalinformation::PersonalInformation, user::User}};


    #[test]
    fn generate_id_test() {
        let id = User::generate_id().get_id();
        assert!(id.to_string().len() > 10)
    }

    #[test]
    fn test_generate_id() {
        let id1 = User::generate_id().get_id();
        let id2 = User::generate_id().get_id();

        assert_ne!(id1, id2);
    }

    #[test]
    fn test_fields() {

        // Create a new user
        let user = User::new(
            None,
            PersonalInformation {
                first_name: "Test".to_owned(),
                last_name: "Test".to_owned(),
                brithday: OffsetDateTime::now_utc(),
                email: None,
                gender: None,
                contacts: Some(Contacts::empty()),
            },
            Credentials::new("test_user".to_string(), "password123".to_string(), false),
            Some(Roles::admin_role()),
            None,
            None,
        );

        assert_ne!(user.id.get_id(), Uuid::nil());

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

        // Create a new user with a specific id
        let user_id = Uuid::new_v4();
        let user = User::new(
            Some(user_id),
            PersonalInformation {
                first_name: "Test".to_owned(),
                last_name: "Test".to_owned(),
                brithday: OffsetDateTime::now_utc(),
                email: Some("test@example.com".to_string()),
                gender: None,
                contacts: Some(Contacts::empty()),
            },
            Credentials::new("test_user".to_string(), "password123".to_string(), false),
            Some(Roles::user_role()),
            None,
            None,
        );

        // Check if the user has the correct id
        assert_eq!(user.id.get_id(), user_id);

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
                first_name: "Test".to_owned(),
                last_name: "Test".to_owned(),
                brithday: OffsetDateTime::now_utc(),
                email: Some("test@example.com".to_string()),
                gender: None,
                contacts: Some(Contacts::empty()),
            },
            Credentials::new("test_user".to_string(), "password123".to_string(), false),
            None,
            None,
            None,
        );

        // Check if the user has the correct id
        assert_eq!(user.id.get_id(), user_id);

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
                first_name: "Test".to_owned(),
                last_name: "Test".to_owned(),
                brithday: OffsetDateTime::now_utc(),
                email: Some("test@example.com".to_string()),
                gender: None,
                contacts: Some(Contacts::empty()),
            },
            Credentials::new("test_user".to_string(), "password123".to_string(), false),
            None,
            None,
            None,
        );

        // Check if the user has a UUID id
        assert_ne!(user.id.get_id(), Uuid::nil());

        // Check if the username, password, and email are set correctly
        assert_eq!(user.credentials.username, "test_user");
        //assert_eq!(user.password, "password123");
        assert_eq!(user.personal_information.email.unwrap(), "test@example.com");

        // Check if the meta field is initialized correctly
    }


}
