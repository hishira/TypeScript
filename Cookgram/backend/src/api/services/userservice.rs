use sqlx::postgres::{PgRow};
use sqlx::Row;

use crate::core::role::role::{Roles, UserRole};
use crate::{api::dtos::userdto::userdto::UserDtos, core::{meta::meta::Meta, user::user::User}};

pub struct UserService {}

impl UserService {
    pub fn get_user_from_dto(user_dto: UserDtos) -> User {
        match user_dto {
            UserDtos::Create(user) => {
                User::new(None, user.username, user.password, user.email, None, None) //TODO: Fix role
            }
            UserDtos::Update(user) => {
                User::new(None, user.username, user.password, user.email, None, None) // FOX role
            }
        }
    }

    pub fn get_user_from_row(pg_row: PgRow) -> User {
        User {
            id: pg_row.get("id"),
            username: pg_row.get("username"),
            password: pg_row.get("password"),
            email: pg_row.get("email"),
            recipies: None,
            meta: Meta::new(), //TODO: Inner join table to retrieve,
            role: UserService::retrive_role_from_row(&pg_row),
        }
    }

    fn retrive_role_from_row(pg_row: &PgRow) -> Roles {
        let role: String = pg_row.get("role");
        match role.as_str() {
            "User" => Roles::user_role(),
            "Admin" => Roles::admin_role(),
            "SuperAdmin" => Roles::super_admin_role(),
            _ => {
                tracing::error!("Not recognized roles");
                Roles::user_role()
            }
        }
    }
}
