use serde::{Deserialize, Serialize};

use crate::core::user::credentials::Credentials;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CredentialsDTO {
    pub username: String,
    #[serde(skip_serializing)]
    pub password_is_temporary: bool,
}

impl CredentialsDTO {
    pub fn from_credentials(credentials: Credentials) -> Self {
        Self {
            username: credentials.username,
            password_is_temporary: credentials.password_is_temporary,
        }
    }
}
