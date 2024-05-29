use serde::{Deserialize, Serialize};

pub trait Access {}

pub trait QueryAccess: Access{}

pub trait ActionAccess: Access{}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub enum Queries {
    User,
    Address,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub enum Action {
    View,
    Create,
    Edit,
    Delete,
    Management, // View, Create Edit, Delete
    SelfManagement // Create, Edit, Delete
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub enum QueriesActions{
    Access(Queries, Action),
}