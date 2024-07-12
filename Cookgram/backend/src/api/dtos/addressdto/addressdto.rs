use serde::Serialize;
use sqlx::{postgres::PgRow, FromRow, Row};

#[derive(Debug,Serialize)]
pub struct AddressDto {
    pub address: Option<String>,
    pub city: Option<String>,
    pub country: Option<String>,
    pub phone: Option<String>,
}

impl<'r> FromRow<'r, PgRow> for AddressDto {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            address: row.try_get("address")?,
            city: row.try_get("city")?,
            country: row.try_get("country")?,
            phone: row.try_get("phone")?,
        })
    }
}
