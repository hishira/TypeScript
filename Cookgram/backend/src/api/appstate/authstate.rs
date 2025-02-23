use crate::api::{repositories::{authenticationrepository::AuthenticationRepository, userrepositories::UserRepositories}, services::authservice::AuthService, utils::password_worker::password_worker::PasswordWorker};

use super::appstate::AppState;

#[derive(Clone)]
pub struct AuthState {
    pub app_state: AppState<AuthenticationRepository>,
    pub auth_service: AuthService,
}