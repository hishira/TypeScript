use super::{
    access::{Access, Action, Queries, QueriesActions},
    role::Role,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct SuperAdminRole {
    access: Vec<QueriesActions>,
}

//Thinkg of view, management
impl Default for SuperAdminRole {
    fn default() -> Self {
        Self {
            access: vec![
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
        match query_action {
            QueriesActions::Access(query, access) => {
                let query_action = self
                    .access
                    .iter()
                    .find(|query_access| query_access.get_queries() == query);
                match query_action {
                    Some(action) => action.get_action().includes(access),
                    None => false,
                }
            }
        }
    }
}
