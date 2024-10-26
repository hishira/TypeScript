use std::error::Error;
use std::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};
use sqlx::encode::IsNull;
use sqlx::postgres::{PgArgumentBuffer, PgTypeInfo, PgValueRef};
use sqlx::{Decode, Encode, Postgres, Type};

use super::access::{Access, QueriesActions};
use super::adminrole::AdminRole;
use super::director::Director;
use super::employee::Employee;
use super::manager::Manager;
use super::superadminrole::SuperAdminRole;
use super::userrole::UserRole;

pub trait Role {
    fn has_access(&self, access: impl Access) -> bool;
    fn has_access_to(&self, query_action: QueriesActions) -> bool;
}

#[derive(Debug, PartialEq, Clone)]
pub enum Roles {
    User(UserRole),
    Admin(AdminRole),
    SuperAdmin(SuperAdminRole),
    Employee(Employee),
    Manager(Manager),
    Director(Director),
}

// impl Try for Roles{}
impl Type<Postgres> for Roles {
    fn type_info() -> PgTypeInfo {
        PgTypeInfo::with_name("Role")
    }
}

impl<'q> Encode<'q, Postgres> for Roles {
    fn encode_by_ref(&self, buf: &mut PgArgumentBuffer) -> IsNull {
        let value = match self {
            Roles::User(_) => "User",
            Roles::Admin(_) => "Admin",
            Roles::SuperAdmin(_) => "SuperAdmin",
            Roles::Employee(_) => "Employee",
            Roles::Manager(_) => "Manager",
            Roles::Director(_) => "Director",
        };
        Encode::<Postgres>::encode(value, buf)
    }
}

impl<'r> Decode<'r, Postgres> for Roles {
    fn decode(value: PgValueRef<'r>) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let s = <&str as Decode<Postgres>>::decode(value).unwrap();
        match s {
            "User" => Ok(Roles::user_role()),
            "Admin" => Ok(Roles::admin_role()),
            "SuperAdmin" => Ok(Roles::super_admin_role()),
            "Employee" => Ok(Roles::employee_role()),
            "Manager" => Ok(Roles::manager_role()),
            "Director" => Ok(Roles::director_role()),
            _ => Err(format!("Invalid role: {}", s).into()),
        }
    }
}

impl Roles {
    pub fn user_role() -> Self {
        Roles::User(UserRole::default())
    }
    pub fn admin_role() -> Self {
        Roles::Admin(AdminRole::default())
    }
    pub fn super_admin_role() -> Self {
        Roles::SuperAdmin(SuperAdminRole::default())
    }

    pub fn employee_role() -> Self {
        Roles::Employee(Employee::default())
    }

    pub fn manager_role() -> Self {
        Roles::Manager(Manager::default())
    }

    pub fn director_role() -> Self {
        Roles::Director(Director::default())
    }

    pub fn has_access_to(&self, query_action: QueriesActions) -> bool {
        match self {
            Roles::User(user) => user.has_access_to(query_action),
            Roles::Admin(admin) => admin.has_access_to(query_action),
            Roles::SuperAdmin(super_admin) => super_admin.has_access_to(query_action),
            Roles::Employee(employee) => employee.has_access_to(query_action),
            Roles::Manager(manager) => manager.has_access_to(query_action),
            Roles::Director(director) => director.has_access_to(query_action),
        }
    }

    pub fn is_user(&self) -> bool {
        match self {
            Roles::User(_) => true,
            _ => false,
        }
    }

    pub fn is_administration_role(&self) -> bool {
        match self {
            Roles::Admin(_) => true,
            Roles::SuperAdmin(_)=>true,
            _ => false
        }
    }
    pub fn is_admin(&self) -> bool {
        match self {
            Roles::Admin(_) => true,
            _ => false,
        }
    }

    pub fn is_super_user(&self) -> bool {
        match self {
            Roles::SuperAdmin(_) => true,
            _ => false,
        }
    }

    pub fn is_employee(&self) -> bool {
        match self {
            Roles::Employee(_) => true,
            _ => false,
        }
    }

    pub fn is_manager(&self) -> bool {
        match self {
            Roles::Manager(_) => true,
            _ => false,
        }
    }

    pub fn is_director(&self) -> bool {
        match self {
            Roles::Director(_) => true,
            _ => false,
        }
    }
}

#[derive(Debug, PartialEq, Eq)]
pub struct ParseFromStringRoleError;

impl fmt::Display for ParseFromStringRoleError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Problem with role conversion")
        // ...
    }
}
impl FromStr for Roles {
    type Err = ParseFromStringRoleError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "User" => Ok(Roles::user_role()),
            "Admin" => Ok(Roles::admin_role()),
            "SuperAdmin" => Ok(Roles::super_admin_role()),
            "Employee" => Ok(Roles::employee_role()),
            "Manager" => Ok(Roles::manager_role()),
            "Director" => Ok(Roles::director_role()),
            _ => Err(ParseFromStringRoleError),
        }
    }
}
impl Serialize for Roles {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Roles::User(_) => serializer.serialize_str("User"),
            Roles::Admin(_) => serializer.serialize_str("Admin"),
            Roles::SuperAdmin(_) => serializer.serialize_str("SuperAdmin"),
            Roles::Employee(_) => serializer.serialize_str("Employee"),
            Roles::Manager(_) => serializer.serialize_str("Manager"),
            Roles::Director(_) => serializer.serialize_str("Director"),
        }
    }
}

impl<'de> Deserialize<'de> for Roles {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let r_string = String::deserialize(deserializer);
        match r_string {
            Ok(role_string) => match Roles::from_str(role_string.as_str()) {
                Ok(role) => Ok(role),
                Err(error) => Err(serde::de::Error::custom(error))
            },
            Err(error) => Err(error),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    struct TestAccess {}

    impl Access for TestAccess {}
    #[test]
    fn test_user_role_has_access() {
        // Create a user role
        let user_role = Roles::user_role();

        // Ensure user role has access
        assert!(match user_role {
            Roles::User(role) => role.has_access(TestAccess {}),
            _ => false,
        });
    }

    #[test]
    fn test_admin_role_has_access() {
        // Create an admin role
        let admin_role = Roles::admin_role();

        // Ensure admin role has access
        assert!(match admin_role {
            Roles::Admin(role) => role.has_access(TestAccess {}),
            _ => false,
        });
    }

    #[test]
    fn test_super_admin_role_has_access() {
        // Create a super admin role
        let super_admin_role = Roles::super_admin_role();

        // Ensure super admin role has access
        assert!(match super_admin_role {
            Roles::SuperAdmin(role) => role.has_access(TestAccess {}),
            _ => false,
        });
    }
}
