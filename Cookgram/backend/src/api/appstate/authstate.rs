use crate::api::{repositories::userrepositories::UserRepositories, utils::password_worker::password_worker::PasswordWorker};

use super::appstate::AppState;

#[derive(Clone)]
pub struct AuthState {
    pub app_state: AppState<UserRepositories>,
    pub pass_worker: PasswordWorker
}