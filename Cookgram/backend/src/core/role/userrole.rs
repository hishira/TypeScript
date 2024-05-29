use serde::{Deserialize, Serialize};

use super::{
    access::{Access, Action, Queries, QueriesActions},
    role::Role,
};

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct UserRole {
    access: Vec<QueriesActions>,
}

impl Default for UserRole {
    fn default() -> Self {
        UserRole {
            access: vec![
                QueriesActions::Access(Queries::User, Action::View),
                QueriesActions::Access(Queries::Address, Action::Management),
            ],
        }
    }
}

impl Role for UserRole {
    fn has_access(&self, _: impl Access) -> bool {
        true
    }
    fn has_access_to(&self, query_action: QueriesActions) -> bool {
        self.access.contains(&query_action)
    }
}
