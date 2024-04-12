use std::marker;

use crate::{api::repositories::{eventrepository::EventRepository, repositories::Repository}, core::entity::Entity};

#[derive(Clone)]
pub struct AppState<T> {
    pub repo: T,
    pub event_repo: EventRepository
}