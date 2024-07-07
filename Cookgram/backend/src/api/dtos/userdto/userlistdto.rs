use serde::Serialize;
use sqlx::{postgres::PgRow, FromRow, Row};
use uuid::Uuid;

use crate::core::state::{entitystate::EntityState, state::State};

#[derive(Debug, Serialize)]
pub struct UserListDto {
    pub id: Uuid,
    pub username: String,
    pub email: Option<String>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub state: State<EntityState>,
}

impl<'r> FromRow<'r, PgRow> for UserListDto {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        Ok(UserListDto {
            id: row.try_get("id")?,
            username: row.try_get("username")?,
            email: row.try_get("email")?,
            first_name: row.try_get("first_name")?,
            last_name: row.try_get("last_name")?,
            state: State {
                current: row.try_get("current_state")?,
                previous: row.try_get("previous_state")?,
            },
        })
    }
}
