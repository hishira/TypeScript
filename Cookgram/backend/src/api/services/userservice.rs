use std::future::Future;

use sqlx::postgres::{PgQueryResult, PgRow};
use sqlx::{Pool, Postgres, QueryBuilder, Row};
use uuid::Uuid;

use crate::api::dtos::roledto::roledto::RoleDto;
use crate::api::dtos::userdto::userdto::{UpdateUserDto, UserFilterOption};
use crate::api::repositories::repositories::Repository;
use crate::api::utils::password_worker::password_worker::PasswordWorker;
use crate::core::role::role::Roles;
use crate::core::state::entitystate::EntityState;
use crate::core::state::state::State;
use crate::{
    api::dtos::userdto::userdto::UserDtos,
    core::{meta::meta::Meta, user::user::User},
};

pub struct UserService {}

impl UserService {
    pub async fn get_user_from_dto(
        user_dto: UserDtos,
        pass_worker: &PasswordWorker,
        user_to_edit: Option<User>,
    ) -> User {
        match user_dto {
            UserDtos::Create(user) => {
                let role = user.role;
                let hash = pass_worker.hash(user.password.clone()).await.unwrap();
                User::new(None, user.username, hash, user.email, role, None) //TODO: Fix role
            }
            UserDtos::Update(user) => {
                let user_from_db = user_to_edit.unwrap();
                let hashed_password: String = match user.password {
                    Some(password) => pass_worker.hash(password.clone()).await.unwrap(),
                    None => user_from_db.password,
                };
                User::new(
                    Some(user_from_db.id),
                    user.username,
                    hashed_password,
                    user.email,
                    Some(user.role.unwrap_or(user_from_db.role)),
                    Some(user_from_db.meta),
                )
                // FOX role
            }
            UserDtos::Delete(_) => todo!(),
        }
    }

    pub async fn create_user_connection(
        user_ids_touple: (Uuid, Uuid),
        pool: Pool<Postgres>,
    ) -> Result<PgQueryResult, sqlx::Error> {
        let mut create_user_connection: QueryBuilder<Postgres> =
            QueryBuilder::new("INSERT INTO EMPLOYEE_CONNECTION (owner_id, user_id) ");
        create_user_connection.push_values(std::iter::once(user_ids_touple), |mut b, touple| {
            b.push_bind(touple.0).push_bind(touple.1);
        });
        return create_user_connection.build().execute(&pool).await;
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
            meta: Meta::meta_based_on_id(pg_row.get("meta_id")), //Meta::new(), //TODO: Inner join table to retrieve,
            role: UserService::retrive_role_from_row(&pg_row).unwrap(),
            address: None,
            managed_users: None,
            state: State {
                current: pg_row.get("current_state"),
                previus: pg_row.get("previous_state"),
            },
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
