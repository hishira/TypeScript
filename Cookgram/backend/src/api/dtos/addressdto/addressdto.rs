use crate::core::address::{address::Address, location::Location};
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgRow, FromRow, Row};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct AddressDto {
    pub address: String,
    pub house: String,
    pub door: Option<String>,
    pub city: String,
    pub country: String,
    pub location: Location,
    pub postal_code: String,
}

pub fn from_address_to_address_dto(address: Address) -> AddressDto {
    AddressDto {
        address: address.address,
        house: address.house,
        door: address.door,
        city: address.city,
        country: address.country,
        location: address.location,
        postal_code: address.postal_code,
    }
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
            postal_code: row.try_get("postal_code")?,
        })
    }
}
