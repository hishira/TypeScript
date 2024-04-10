use serde::{Deserialize, Serialize};

pub struct Access {}
pub trait Role {
    fn has_access(access: Access) -> bool;
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct UserRole {}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct AdminRole {}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct SuperAdminRole {}

impl Role for UserRole {
    fn has_access(_: Access) -> bool {
        todo!()
    }
}
impl Role for AdminRole {
    fn has_access(_: Access) -> bool {
        todo!()
    }
}
impl Role for SuperAdminRole {
    fn has_access(_: Access) -> bool {
        todo!()
    }
}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
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
