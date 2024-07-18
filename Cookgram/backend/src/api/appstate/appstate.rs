use std::marker;

use crate::{
    api::{
        repositories::{eventrepository::EventRepository, repositories::Repository},
        utils::password_worker::password_worker::PasswordWorker,
    },
    core::entity::Entity,
    database::redis::redisdatabase::RedisDatabase,
};

#[derive(Clone)]
pub struct AppState<T> {
    pub repo: T,
    pub event_repo: EventRepository,
    pub redis_database: RedisDatabase,
}
