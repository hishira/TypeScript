use std::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};
use serde::de::Error;

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
#[derive(Debug, PartialEq, Clone, Copy)]
pub enum Roles {
    User(UserRole),
    Admin(AdminRole),
    SuperAdmin(SuperAdminRole),
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
                Err(error) => Err(error).map_err(D::Error::custom),
            },
            Err(error) => Err(error),
        }
    }
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

    pub fn is_user(&self) -> bool {
        match self {
            Roles::User(_) => true,
            Roles::Admin(_) => false,
            Roles::SuperAdmin(_) => false,
        }
    }

    pub fn is_admin(&self) -> bool {
        match self {
            Roles::User(_) => false,
            Roles::Admin(_) => false,
            Roles::SuperAdmin(_) => true,
        }
    }

    pub fn is_super_user(&self) -> bool {
        match self {
            Roles::User(_) => false,
            Roles::Admin(_) => false,
            Roles::SuperAdmin(_) => true,
        }
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
