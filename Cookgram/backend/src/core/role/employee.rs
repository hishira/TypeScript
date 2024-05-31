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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_employee_default() {
        let employee = Employee::default();

        assert!(employee.has_access_to(QueriesActions::Access(Queries::User, Action::View)));
        assert!(employee.has_access_to(QueriesActions::Access(Queries::Address, Action::SelfManagement)));

        assert!(!employee.has_access_to(QueriesActions::Access(Queries::User, Action::SelfManagement)));
        assert!(!employee.has_access_to(QueriesActions::Access(Queries::Address, Action::View)));
    }

    #[test]
    fn test_employee_has_access() {
        let employee = Employee::default();

        // Zakładam, że implementacja `Access` jest odpowiednia
        struct TestAccess;
        impl Access for TestAccess {}

        let test_access = TestAccess;

        // Zawsze powinno zwracać true, zgodnie z implementacją
        assert!(employee.has_access(test_access));
    }

    #[test]
    fn test_employee_custom_access() {
        let custom_access = vec![
            QueriesActions::Access(Queries::User, Action::SelfManagement),
        ];
        let employee = Employee { access: custom_access.clone() };

        assert!(employee.has_access_to(QueriesActions::Access(Queries::User, Action::SelfManagement)));
        assert!(!employee.has_access_to(QueriesActions::Access(Queries::User, Action::View)));
    }
}
