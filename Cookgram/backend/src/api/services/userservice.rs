use sqlx::postgres::{PgRow};
use sqlx::Row;

use crate::{api::dtos::userdto::userdto::UserDtos, core::{meta::meta::Meta, user::user::User}};

pub struct UserService {}

impl UserService {
    pub fn get_user_from_dto(user_dto: UserDtos) -> User {
        match user_dto {
            UserDtos::Create(user) => {
                User::new(None, user.username, user.password, user.email, None)
            }
            UserDtos::Update(user) => {
                User::new(None, user.username, user.password, user.email, None)
            }
        }
    }

    pub fn get_user_from_row(pg_row: PgRow) -> User {
        User {
            id: pg_row.get("id"),
            username: pg_row.get("username"),
            password: "".to_string(),
            email: pg_row.get("email"),
            recipies: None,
            meta: Meta::new(), //TODO: Inner join table to retrieve
        }
    }
}
