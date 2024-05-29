use serde::{Deserialize, Serialize};

use super::{
    access::{Access, Action, Queries, QueriesActions},
    role::Role,
};

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct Employee {
    access: Vec<QueriesActions>,
}
impl Default for Employee {
    fn default() -> Self {
        Self {
            access: vec![
                QueriesActions::Access(Queries::User, Action::View),
                QueriesActions::Access(Queries::Address, Action::SelfManagement),
            ],
        }
    }
}

impl Role for Employee {
    fn has_access(&self, access: impl Access) -> bool {
        true
    }
    fn has_access_to(&self, query_action: QueriesActions) -> bool {
        self.access.contains(&query_action)
    }
}
