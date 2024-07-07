use sqlx::postgres::{PgQueryResult, PgRow};
use sqlx::{Pool, Postgres, QueryBuilder, Row};
use uuid::Uuid;

use crate::api::daos::userdao::UserDAO;
use crate::api::dtos::roledto::roledto::RoleDto;
use crate::api::dtos::userdto::userdto::UserFilterOption;
use crate::api::dtos::userdto::userlistdto::UserListDto;
use crate::api::repositories::repositories::Repository;
use crate::api::utils::password_worker::password_worker::PasswordWorker;
use crate::core::role::role::Roles;
use crate::core::state::state::State;
use crate::{
    api::dtos::userdto::userdto::UserDtos,
    core::{meta::meta::Meta, user::user::User},
};

#[derive(Clone)]
pub struct UserService {
    pub user_dao: UserDAO,
}

impl UserService {
    pub fn new(user_dao: UserDAO) -> Self {
        Self { user_dao }
    }

    pub async fn get_users(&self, params: UserFilterOption) -> Result<Vec<UserListDto>, sqlx::Error> {
        self.user_dao.user_list(params).await
    }

    pub async fn get_user_from_dto(
        user_dto: UserDtos,
        pass_worker: &PasswordWorker,
        user_to_edit: Option<User>,
    ) -> User {
        match user_dto {
            UserDtos::Create(user) => {
                let role = user.role;
                let hash = pass_worker.hash(user.password.clone()).await.unwrap();
                User::new(
                    None,
                    user.username,
                    hash,
                    user.email,
                    role,
                    None,
                    user.first_name,
                    user.last_name,
                )
            }
            UserDtos::Update(user) => {
                let mut user_from_db = user_to_edit.unwrap();
                user_from_db.meta.update_edit_date();
                let hashed_password: String = match user.password {
                    Some(password) => pass_worker.hash(password.clone()).await.unwrap(),
                    None => user_from_db.password,
                };
                User::new(
                    Some(user_from_db.id),
                    user.username,
                    hashed_password,
                    user.email.unwrap_or(user_from_db.email),
                    Some(user.role.unwrap_or(user_from_db.role)),
                    Some(user_from_db.meta),
                    user.first_name.or(user_from_db.first_name),
                    user.last_name.or(user_from_db.last_name),
                )
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

    pub async fn create_managed(
        user: User,
        repo: impl Repository<User, UserFilterOption, sqlx::Error>,
    ) -> User {
        todo!()
    }

    pub fn get_user_from_row(pg_row: PgRow) -> User {
        User {
            id: pg_row.get("id"),
            first_name: pg_row
                .try_get("first_name")
                .unwrap_or(Some("NULL".to_string())),
            last_name: pg_row
                .try_get("last_name")
                .unwrap_or(Some("NULL".to_string())),
            username: pg_row
                .try_get("username")
                .unwrap_or("Not found ".to_string()),
            password: pg_row
                .try_get("password")
                .unwrap_or("Not found ".to_string()),
            email: pg_row.try_get("email").unwrap_or("Not found ".to_string()),
            meta: Meta::meta_based_on_id(pg_row.get("meta_id")), //Meta::new(), //TODO: Inner join table to retrieve,
            role: UserService::retrive_role_from_row(&pg_row).unwrap(),
            address: None,
            state: State {
                current: pg_row.get("current_state"),
                previous: pg_row.get("previous_state"),
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
