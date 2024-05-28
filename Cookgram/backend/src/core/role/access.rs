use serde::{Deserialize, Serialize};

pub trait Access {}

pub trait QueryAccess: Access{}

pub trait ActionAccess: Access{}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub enum Queries {
    User(Vec<Action>),
    Address(Action),
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy, Hash, Eq)]

pub enum Action {
    View,
    Create,
    Edit,
    Delete,
}