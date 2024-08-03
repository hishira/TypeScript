use serde::{Deserialize, Serialize};

use crate::api::utils::password_worker::password_worker::{PasswordWorker, PasswordWorkerError};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Credentials {
    pub username: String,
    #[serde(skip_serializing)]
    pub password: String,
    pub password_is_temporary: bool,
}

impl Credentials {
    pub fn new(username: String, password: String, password_is_temporary: bool) -> Self {
        Self {
            username,
            password,
            password_is_temporary,
        }
    }

    pub async fn new_with_hashed_password(
        username: String,
        password: String,
        password_is_temporary: bool,
    ) -> Result<Self, PasswordWorkerError> {
        let pass_worker = PasswordWorker::new(10, 4)?;
        let hashed_password = pass_worker.hash(password).await;
        match hashed_password {
            Ok(password_hashed) => Ok(Self {
                username,
                password: password_hashed,
                password_is_temporary,
            }),
            Err(error) => {
                tracing::error!("Error occure {}", error);
                Err(error)
            }
        }
    }
}
