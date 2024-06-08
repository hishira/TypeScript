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
                QueriesActions::Access(Queries::User, Action::SelfManagement),
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_user_role_default() {
        let user_role = UserRole::default();

        assert!(user_role.has_access_to(QueriesActions::Access(Queries::User, Action::View)));
        assert!(
            user_role.has_access_to(QueriesActions::Access(Queries::Address, Action::Management))
        );

        assert!(!user_role.has_access_to(QueriesActions::Access(Queries::User, Action::Management)));
        assert!(!user_role.has_access_to(QueriesActions::Access(Queries::Address, Action::View)));
    }

    #[test]
    fn test_user_role_has_access() {
        let user_role = UserRole::default();

        // Zakładam, że implementacja `Access` jest odpowiednia
        struct TestAccess;
        impl Access for TestAccess {}

        let test_access = TestAccess;

        // Zawsze powinno zwracać true, zgodnie z implementacją
        assert!(user_role.has_access(test_access));
    }

    #[test]
    fn test_user_role_custom_access() {
        let custom_access = vec![QueriesActions::Access(Queries::User, Action::Management)];
        let user_role = UserRole {
            access: custom_access.clone(),
        };

        assert!(user_role.has_access_to(QueriesActions::Access(Queries::User, Action::Management)));
        assert!(!user_role.has_access_to(QueriesActions::Access(Queries::User, Action::View)));
    }
}
