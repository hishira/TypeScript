use crate::{
    api::repositories::eventrepository::EventRepository,
    database::redis::redisdatabase::RedisDatabase,
};

#[derive(Clone)]
pub struct AppState<T> {
    pub repo: T,
    pub event_repo: EventRepository,
    pub redis_database: RedisDatabase,
}
