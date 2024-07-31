use crate::api::{repositories::userrepositories::UserRepositories, services::authservice::AuthService, utils::password_worker::password_worker::PasswordWorker};

use super::appstate::AppState;

#[derive(Clone)]
pub struct AuthState {
    pub app_state: AppState<UserRepositories>,
    pub auth_service: AuthService,
    // pub pass_worker: PasswordWorker
}