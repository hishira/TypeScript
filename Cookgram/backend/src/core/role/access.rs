use serde::{Deserialize, Serialize};

pub trait Access {}

pub trait QueryAccess: Access {}

pub trait ActionAccess: Access {}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub enum Queries {
    Meta,
    User,
    Address,
    UserContracts,
    Events,
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub enum Action {
    View,
    Create,
    Edit,
    Delete,
    Management,     // View, Create Edit, Delete
    SelfManagement, // Create, Edit, Delete
}

impl Action {
    pub fn includes(&self, action: Action) -> bool {
        match (self, action) {
            (Action::View, Action::View) => true,
            (Action::View, _) => false,
            (Action::Create, Action::Create) => true,
            (Action::Create, _) => false,
            (Action::Edit, Action::Edit) => true,
            (Action::Edit, _) => false,
            (Action::Delete, Action::Delete) => true,
            (Action::Delete, _) => false,
            (Action::Management, _) => true,
            (Action::SelfManagement, Action::Management) => false,
            (Action::SelfManagement, _) => true,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub enum QueriesActions {
    Access(Queries, Action),
}

impl QueriesActions {
    pub fn get_queries(&self) -> Queries {
        match self {
            QueriesActions::Access(query, _) => query.clone(),
        }
    }

    pub fn get_action(&self) -> Action {
        match self {
            QueriesActions::Access(_, action) => action.clone(),
        }
    }
}
