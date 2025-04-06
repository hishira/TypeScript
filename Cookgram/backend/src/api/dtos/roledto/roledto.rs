use crate::core::role::role::Roles;
use serde::{Deserialize, Serialize};
use std::fmt;
use std::str::FromStr;

#[derive(sqlx::Type, PartialEq, Debug, Clone)]
#[sqlx(type_name = "Role")]
pub enum RoleDto {
    User,
    Admin,
    SuperAdmin,
    Employee,
    Manager,
    Director,
}

pub fn map_roles_to_role_dto(role: Roles) -> RoleDto {
    match role {
        Roles::User(_) => RoleDto::User,
        Roles::Admin(_) => RoleDto::Admin,
        Roles::SuperAdmin(_) => RoleDto::SuperAdmin,
        Roles::Employee(_) => RoleDto::Employee,
        Roles::Manager(_) => RoleDto::Manager,
        Roles::Director(_) => RoleDto::Director,
    }
}

pub fn map_to_roles(role: RoleDto) -> Roles {
    get_role(role)
}

pub fn get_role(dto_role: RoleDto) -> Roles {
    match dto_role {
        RoleDto::User => Roles::user_role(),
        RoleDto::Admin => Roles::admin_role(),
        RoleDto::SuperAdmin => Roles::super_admin_role(),
        RoleDto::Employee => Roles::employee_role(),
        RoleDto::Manager => Roles::manager_role(),
        RoleDto::Director => Roles::director_role(),
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

impl FromStr for RoleDto {
    type Err = ParseFromStringRoleError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "User" => Ok(RoleDto::User),
            "Admin" => Ok(RoleDto::Admin),
            "SuperAdmin" => Ok(RoleDto::SuperAdmin),
            "Employee" => Ok(RoleDto::Employee),
            "Manager" => Ok(RoleDto::Manager),
            "Director" => Ok(RoleDto::Director),
            _ => Err(ParseFromStringRoleError),
        }
    }
}

impl Serialize for RoleDto {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            RoleDto::User => serializer.serialize_str("User"),
            RoleDto::Admin => serializer.serialize_str("Admin"),
            RoleDto::SuperAdmin => serializer.serialize_str("SuperAdmin"),
            RoleDto::Employee => serializer.serialize_str("Employee"),
            RoleDto::Manager => serializer.serialize_str("Manager"),
            RoleDto::Director => serializer.serialize_str("Director"),
        }
    }
}

impl<'de> Deserialize<'de> for RoleDto {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let r_string = String::deserialize(deserializer);
        match r_string {
            Ok(role_string) => match RoleDto::from_str(role_string.as_str()) {
                Ok(role) => Ok(role),
                Err(error) => Err(serde::de::Error::custom(error)),
            },
            Err(error) => Err(error),
        }
    }
}
