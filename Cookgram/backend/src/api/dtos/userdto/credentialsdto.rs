use serde::{Deserialize, Serialize};

use crate::core::user::credentials::Credentials;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CredentialsDTO {
    pub username: String,
    #[serde(skip_serializing)]
    pub password: String,
    #[serde(skip_serializing)]
    pub password_is_temporary: bool,
}

#[derive(Clone, Deserialize)]
pub struct CredentialsFilterOption {
    pub username: Option<String>,
    pub password: Option<String>,
    pub password_is_temporary: Option<bool>,
}

pub fn get_credentials_dto_from_credentials(credentials: Credentials) -> CredentialsDTO {
    CredentialsDTO {
        username: credentials.username,
        password: credentials.password,
        password_is_temporary: credentials.password_is_temporary,
    }
}
