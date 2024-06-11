use serde::{Deserialize, Serialize};

use super::{
    access::{Access, Action, Queries, QueriesActions},
    role::Role,
};

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct Manager {
    access: Vec<QueriesActions>,
}

impl Default for Manager {
    fn default() -> Self {
        Self {
            access: vec![
                QueriesActions::Access(Queries::User, Action::Management),
                QueriesActions::Access(Queries::Address, Action::Management),
                QueriesActions::Access(Queries::UserContracts, Action::Management),
            ],
        }
    }
}

impl Role for Manager {
    fn has_access(&self, access: impl Access) -> bool {
        true
    }

    fn has_access_to(&self, query_action: QueriesActions) -> bool {
        self.access.contains(&query_action)
    }
}
