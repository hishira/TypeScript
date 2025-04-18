use super::{credentials::Credentials, userid::UserId};
use crate::core::entity::Entity;
use serde::{Deserialize, Serialize};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Authentication {
    pub user_id: UserId,
    pub username: String,
    pub password: String,
    pub password_is_temporary: Option<bool>,
}

impl Entity for Authentication {
    fn generate_id() -> impl crate::core::entity::entity::IdGenerator {
        UserId::default()
    }
}

impl Authentication {
    pub fn new(
        user_id: UserId,
        username: String,
        password: String,
        password_is_temporary: bool,
    ) -> Self {
        Self {
            user_id,
            username,
            password,
            password_is_temporary: Some(password_is_temporary),
        }
    }

    pub fn get_credentials(&self) -> Credentials {
        Credentials {
            username: self.username.clone(),
            password: self.password.clone(),
            password_is_temporary: self.password_is_temporary.unwrap_or(false),
        }
    }

    pub fn convert_to_credentials(auth: Authentication) -> Credentials {
        Credentials {
            username: auth.username,
            password: auth.password,
            password_is_temporary: auth.password_is_temporary.unwrap_or(false),
        }
    }

    pub fn from_credentials(user_id: UserId, credentials: Credentials) -> Self {
        Self {
            user_id,
            password: credentials.password,
            password_is_temporary: Some(credentials.password_is_temporary),
            username: credentials.username,
        }
    }
}
