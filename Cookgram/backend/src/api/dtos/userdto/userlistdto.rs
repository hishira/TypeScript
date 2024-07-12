use serde::Serialize;
use sqlx::{postgres::PgRow, FromRow, Row};
use uuid::Uuid;

use crate::core::{
    address::address::Address,
    state::{entitystate::EntityState, state::State},
};

#[derive(Debug, Serialize)]
pub struct UserListDto {
    pub id: Uuid,
    pub username: String,
    pub email: Option<String>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub state: State<EntityState>,
    pub contract_id: Option<Uuid>,
    pub address: Option<Address>,
}

impl UserListDto {
    fn try_to_retrive_address<'r>(row: &'r PgRow) -> Result<Option<Address>, sqlx::Error> {
        let city = row.try_column("city");
        match city {
            Ok(_) => match Address::from_row(&row) {
                Ok(address) => Ok(Some(address)),
                Err(error) => {
                    tracing::error!("Error {}", error);
                    Ok(None)
                }
            },
            Err(_) => Ok(None),
        }
    }
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
            contract_id: row.try_get("contract_id")?,
            address: Self::try_to_retrive_address(row)?,
        })
    }
}
