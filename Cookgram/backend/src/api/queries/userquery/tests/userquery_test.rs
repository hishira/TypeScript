
use time::OffsetDateTime;

use crate::core::{
    meta::meta::Meta,
    role::role::Roles,
    state::{entitystate::EntityState, state::State},
    user::{contact::Contacts, credentials::Credentials, personalinformation::PersonalInformation},
};

use super::*;

fn validate_action_query(user_query: &UserQuery, entity: User) -> QueryBuilder<'static, Postgres> {
    UserQuery::create(entity)
}

// fn validate_update_action_query(user_query: &UserQuery, entity: User) -> String {
//     user_query.update(entity)
// }

#[test]
fn test_user_query_build_with_all_params() {
    let user_query = UserQuery::new(
        Some(Uuid::new_v4()),
        Some("username".to_string()),
        Some("email@example.com".to_string()),
    );

    let built_query = user_query.build();

    assert_eq!(
        built_query,
        "SELECT * FROM users where id = $1 AND username = $2 AND email = $3"
    );
}

#[test]
fn test_user_query_build_with_username_only() {
    let user_query = UserQuery::new(None, Some("username".to_string()), None);

    let built_query = user_query.build();

    assert_eq!(built_query, "SELECT * FROM users where username = $1");
}

#[test]
fn test_user_query_build_with_email_only() {
    let user_query = UserQuery::new(None, None, Some("email@example.com".to_string()));

    let built_query = user_query.build();

    assert_eq!(built_query, "SELECT * FROM users where email = $1");
}

#[test]
fn test_user_query_build_with_no_params() {
    let user_query = UserQuery::new(None, None, None);

    let built_query = user_query.build();

    assert_eq!(built_query, "SELECT * FROM users where");
}

#[test]
fn test_user_query_create() {
    let user_query = UserQuery::new(None, None, None);

    let test_user = User {
        id: Uuid::new_v4(),
        personal_information: PersonalInformation {
            first_name: None,
            last_name: None,
            brithday: OffsetDateTime::now_utc(),
            email: Some("test@example.com".to_string()),
            gender: None,
            contacts: Some(Contacts::empty()),
        },
        credentials: Credentials {
            username: "test_user".to_string(),
            password: "password".to_string(),
        },
        meta: Meta::new(),
        role: Roles::user_role(),
        address: None,
        state: State {
            current: EntityState::Active,
            previous: None,
        },
    };

    let mut create_query = validate_action_query(&user_query, test_user);

    assert_eq!(
        create_query.build().sql().to_string(),
        "INSERT INTO USERS(id, username, password, email) VALUES ($1, $2, $3, $4)"
    );
}

#[test]
#[should_panic]

fn test_user_query_delete() {
    let user_query = UserQuery::new(None, None, None);

    let test_user = User {
        id: Uuid::new_v4(),
        personal_information: PersonalInformation {
            first_name: None,
            last_name: None,
            brithday: OffsetDateTime::now_utc(),
            email: Some("test@example.com".to_string()),
            gender: None,
            contacts: Some(Contacts::empty()),
        },
        credentials: Credentials {
            username: "test_user".to_string(),
            password: "password".to_string(),
        },
        meta: Meta::new(),
        role: Roles::user_role(),
        address: None,
        state: State {
            current: EntityState::Active,
            previous: None,
        },
    };

    let _ = UserQuery::delete(test_user);
}
