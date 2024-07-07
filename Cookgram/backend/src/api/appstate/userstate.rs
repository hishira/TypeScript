use crate::api::{repositories::userrepositories::UserRepositories, services::userservice::UserService};

use super::appstate::AppState;

#[derive(Clone)]
pub struct UserState{
    pub app_state: AppState<UserRepositories>,
    pub user_service: UserService,
}