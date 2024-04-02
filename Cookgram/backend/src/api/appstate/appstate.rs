use std::marker;

use crate::{api::repositories::repositories::Repository, core::entity::Entity};

#[derive(Clone)]
pub struct AppState<T> {
    pub repo: T,
}