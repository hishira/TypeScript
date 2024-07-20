use serde::Serialize;
use sqlx::{postgres::PgRow, FromRow, Row};

use crate::core::address::location::Location;

#[derive(Debug, Serialize)]
pub struct AddressDto {
    pub address: Option<String>,
    pub house: String,
    pub door: Option<String>,
    pub city: Option<String>,
    pub country: Option<String>,
    pub location: Location,
    pub phone: Option<String>,
    pub postal_code: String,
}

impl<'r> FromRow<'r, PgRow> for AddressDto {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            address: row.try_get("address")?,
            house: row.try_get("house")?,
            door: row.try_get("door")?,
            location: Location {
                latitude: row.try_get("lat")?,
                longitude: row.try_get("long")?,
            },
            city: row.try_get("city")?,
            country: row.try_get("country")?,
            phone: row.try_get("phone")?,
            postal_code: row.try_get("postal_code")?,
        })
    }
}
