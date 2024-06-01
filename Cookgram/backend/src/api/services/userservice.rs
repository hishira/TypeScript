use sqlx::postgres::PgRow;
use sqlx::Row;

use crate::api::dtos::roledto::roledto::RoleDto;
use crate::api::dtos::userdto::userdto::UserFilterOption;
use crate::api::repositories::repositories::Repository;
use crate::api::utils::password_worker::password_worker::PasswordWorker;
use crate::core::role::role::{Roles};
use crate::{
    api::dtos::userdto::userdto::UserDtos,
    core::{meta::meta::Meta, user::user::User},
};

pub struct UserService {}

impl UserService {
    pub async fn get_user_from_dto(user_dto: UserDtos, pass_worker: &PasswordWorker) -> User {
        match user_dto {
            UserDtos::Create(user) => {
                let hash = pass_worker.hash(user.password.clone()).await.unwrap();
                User::new(
                    None,
                    user.username,
                    hash,
                    user.email,
                    Some(Roles::user_role()),
                ) //TODO: Fix role
            }
            UserDtos::Update(user) => {
                User::new(None, user.username, user.password, user.email, None)
                // FOX role
            }
            UserDtos::Delete(_) => todo!(),
        }
    }

    pub async fn create_managed(user: User, repo: impl Repository<User, UserFilterOption>) -> User {
        todo!()
    }

    pub fn get_user_from_row(pg_row: PgRow) -> User {
        User {
            id: pg_row.get("id"),
            username: pg_row.get("username"),
            password: pg_row.get("password"),
            email: pg_row.get("email"),
            meta: Meta::new(), //TODO: Inner join table to retrieve,
            role: UserService::retrive_role_from_row(&pg_row).unwrap(),
            address: None,
            managed_users: None,
        }
    }

    fn retrive_role_from_row(pg_row: &PgRow) -> Result<Roles, sqlx::Error> {
        let role: Result<RoleDto, sqlx::Error> = pg_row.try_get("role");
        match role {
            Ok(res) => Ok(res.map_to_roles()),
            Err(error) => {
                tracing::error!("Not recognized roles");
                Err(error)
            }
        }
    }
}
