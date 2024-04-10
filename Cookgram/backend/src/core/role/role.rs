use serde::{Deserialize, Serialize};

pub trait Role {}

#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct UserRole {}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct AdminRole {}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub struct SuperAdminRole {}

impl Role for UserRole {}
impl Role for AdminRole {}
impl Role for SuperAdminRole {}
#[derive(Debug, Serialize, Deserialize, PartialEq, Clone)]
pub enum Roles {
    User(UserRole),
    Admin(AdminRole),
    SuperAdmin(SuperAdminRole),
}
