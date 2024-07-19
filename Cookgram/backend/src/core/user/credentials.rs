use serde::{Deserialize, Serialize};

use crate::api::utils::password_worker::password_worker::{PasswordWorker, PasswordWorkerError};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Credentials {
    pub username: String,
    #[serde(skip_serializing)]
    pub password: String,
}

impl Credentials {
    pub fn new(username: String, password: String) -> Self {
        Self { username, password }
    }

    pub async fn new_with_hashed_password(
        username: String,
        password: String,
    ) -> Result<Self, PasswordWorkerError> {
        let pass_worker = PasswordWorker::new(10, 4)?;
        // TODO: error handle
        let hashed_password = pass_worker.hash(password).await?;
        Ok(Self {
            username,
            password: hashed_password,
        })
    }
}
