use serde::{Deserialize, Serialize};

pub struct Access {}
pub trait Role {
    fn has_access(&self, access: Access) -> bool;
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub struct UserRole {}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub struct AdminRole {}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub struct SuperAdminRole {}

impl Role for UserRole {
    fn has_access(&self, _: Access) -> bool {
       true
    }
}
impl Role for AdminRole {
    fn has_access(&self, _: Access) -> bool {
        true
    }
}
impl Role for SuperAdminRole {
    fn has_access(&self, _: Access) -> bool {
        true
    }
}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone, Copy)]
pub enum Roles {
    User(UserRole),
    Admin(AdminRole),
    SuperAdmin(SuperAdminRole),
}

impl Roles {
    pub fn user_role() -> Self {
        Roles::User(UserRole {})
    }
    pub fn admin_role() -> Self {
        Roles::Admin(AdminRole {})
    }
    pub fn super_admin_role() -> Self {
        Roles::SuperAdmin(SuperAdminRole {})
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_user_role_has_access() {
        // Create a user role
        let user_role = Roles::user_role();

        // Ensure user role has access
        assert!(match user_role {
            Roles::User(role) => role.has_access(Access {}),
            _ => false,
        });
    }

    #[test]
    fn test_admin_role_has_access() {
        // Create an admin role
        let admin_role = Roles::admin_role();

        // Ensure admin role has access
        assert!(match admin_role {
            Roles::Admin(role) => role.has_access(Access {}),
            _ => false,
        });
    }

    #[test]
    fn test_super_admin_role_has_access() {
        // Create a super admin role
        let super_admin_role = Roles::super_admin_role();

        // Ensure super admin role has access
        assert!(match super_admin_role {
            Roles::SuperAdmin(role) => role.has_access(Access {}),
            _ => false,
        });
    }
}
