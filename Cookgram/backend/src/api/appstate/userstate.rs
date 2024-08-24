use tokio::sync::mpsc::Sender;

use crate::{
    api::{repositories::userrepositories::UserRepositories, services::userservice::UserService},
    core::event::eventTask::EventTask,
};

use super::appstate::AppState;

#[derive(Clone)]
pub struct UserState {
    pub app_state: AppState<UserRepositories>,
    pub user_service: UserService,
    pub send: Sender<EventTask>,
}
