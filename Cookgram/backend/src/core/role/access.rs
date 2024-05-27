use serde::{Deserialize, Serialize};

pub trait Access {}

pub trait QueryAccess: Access{}

pub trait ActionAccess: Access{}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy, Hash, Eq)]
pub enum Queries {
    User(Action),
    Address(Action),
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy, Hash, Eq)]

pub enum Action {
    Create,
    Edit,
    Delete,
}