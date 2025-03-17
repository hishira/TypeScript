use crate::api::{
    repositories::authenticationrepository::AuthenticationRepository,
    services::authservice::AuthService,
};

use super::appstate::AppState;

#[derive(Clone)]
pub struct AuthState {
    pub app_state: AppState<AuthenticationRepository>,
    pub auth_service: AuthService,
}
