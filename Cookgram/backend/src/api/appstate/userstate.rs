use super::appstate::AppState;
use crate::{
    api::{repositories::userrepositories::UserRepositories, services::userservice::UserService},
    core::event::eventTask::EventTask,
};
use tokio::sync::mpsc::Sender;

#[derive(Clone)]
pub struct UserState {
    pub app_state: AppState<UserRepositories>,
    pub user_service: UserService,
    pub send: Sender<EventTask>,
}
