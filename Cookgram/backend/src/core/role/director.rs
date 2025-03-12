use serde::{Deserialize, Serialize};

use super::{access::{Access, Action, Queries, QueriesActions}, role::Role};


#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct Director {
    access: Vec<QueriesActions>,
}

impl Default for Director {
    fn default() -> Self {
        Self {
            access: vec![
                QueriesActions::Access(Queries::User, Action::View),
                QueriesActions::Access(Queries::Address, Action::SelfManagement),
                QueriesActions::Access(Queries::UserContracts, Action::Management),
            ],
        }
    }
}
impl Role for Director {
    fn has_access(&self, _access: impl Access) -> bool {
        true
    }

    fn has_access_to(&self, query_action: QueriesActions) -> bool {
        self.access.contains(&query_action)
    }
}
