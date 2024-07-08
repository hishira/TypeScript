use serde::{Deserialize, Serialize};

use super::{access::{Access, Action, Queries, QueriesActions}, role::Role};

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct SuperAdminRole {
    access: Vec<QueriesActions>,
}

//Thinkg of view, management
impl Default for SuperAdminRole {
    fn default() -> Self {
        Self {
            access: vec![
                QueriesActions::Access(Queries::User, Action::View),
                QueriesActions::Access(Queries::User, Action::Management),
                QueriesActions::Access(Queries::Address, Action::Management),
            ],
        }
    }
}

impl Role for SuperAdminRole {
    fn has_access(&self, _: impl Access) -> bool {
        true
    }

    fn has_access_to(&self, query_action: QueriesActions) -> bool {
        self.access.contains(&query_action)
    }
}