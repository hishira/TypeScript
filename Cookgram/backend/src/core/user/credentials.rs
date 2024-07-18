use serde::{Deserialize, Serialize};

use crate::api::utils::password_worker::password_worker::PasswordWorker;

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

    pub async fn new_with_hashed_password(username: String, password: String) -> Self {
        let pass_worker = PasswordWorker::new(10, 4).unwrap();
        // TODO: error handle
        let hashed_password = pass_worker.hash(password).await.unwrap();
        Self {
            username,
            password: hashed_password,
        }
    }
}
