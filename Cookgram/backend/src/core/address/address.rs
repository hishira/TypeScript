use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgRow, FromRow, Row};

use crate::core::valueObject::value_object::ValueObject;

use super::location::Location;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Address {
    pub address: String,
    pub house: String,
    pub door: Option<String>,
    pub city: String,
    pub country: String,
    pub location: Location,
    pub postal_code: String,
}

impl ValueObject for Address {}

impl Address {
    pub fn new(
        address: String,
        house: String,
        door: Option<String>,
        city: String,
        country: String,
        location: Location,
        postal_code: String,
    ) -> Address {
        Address {
            address,
            house,
            door,
            city,
            country,
            location,
            postal_code,
        }
    }
}

impl<'r> FromRow<'r, PgRow> for Address {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            address: row.try_get("address")?,
            house: row.try_get("house")?,
            city: row.try_get("city")?,
            country: row.try_get("country")?,
            location: Location {
                latitude: row.try_get("lat")?,
                longitude: row.try_get("long")?,
            },
            door: row.try_get("door")?,
            postal_code: row.try_get("postal_code")?,
        })
    }
}
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_address_creation() {
        let location = Location {
            latitude: Some(45.0),
            longitude: Some(90.0),
        };
        let address = Address {
            address: String::from("123 Main St"),
            house: String::from("10A"),
            door: Some(String::from("2B")),
            city: String::from("Warsaw"),
            country: String::from("Poland"),
            location,
            postal_code: String::from("00-001"),
        };

        assert_eq!(address.address, "123 Main St");
        assert_eq!(address.house, "10A");
        assert_eq!(address.door, Some(String::from("2B")));
        assert_eq!(address.city, "Warsaw");
        assert_eq!(address.country, "Poland");
        assert_eq!(address.postal_code, "00-001");
        assert_eq!(address.location.latitude, Some(45.0));
        assert_eq!(address.location.longitude, Some(90.0));
    }

    #[test]
    fn test_address_creation_without_optional_fields() {
        let location = Location {
            latitude: Some(45.0),
            longitude: Some(90.0),
        };
        let address = Address {
            address: String::from("123 Main St"),
            house: String::from("10A"),
            door: None,
            city: String::from("Warsaw"),
            country: String::from("Poland"),
            location,
            postal_code: String::from("00-001"),
           
        };

        assert_eq!(address.address, "123 Main St");
        assert_eq!(address.house, "10A");
        assert_eq!(address.door, None);
        assert_eq!(address.city, "Warsaw");
        assert_eq!(address.country, "Poland");
        assert_eq!(address.postal_code, "00-001");
        assert_eq!(address.location.latitude, Some(45.0));
        assert_eq!(address.location.longitude, Some(90.0));
    }

    #[test]
    fn test_address_creation_with_none_location() {
        let location = Location {
            latitude: None,
            longitude: None,
        };
        let address = Address {
            address: String::from("123 Main St"),
            house: String::from("10A"),
            door: Some(String::from("2B")),
            city: String::from("Warsaw"),
            country: String::from("Poland"),
            location,
            postal_code: String::from("00-001"),
        };

        assert_eq!(address.address, "123 Main St");
        assert_eq!(address.house, "10A");
        assert_eq!(address.door, Some(String::from("2B")));
        assert_eq!(address.city, "Warsaw");
        assert_eq!(address.country, "Poland");
        assert_eq!(address.postal_code, "00-001");
        assert_eq!(address.location.latitude, None);
        assert_eq!(address.location.longitude, None);
    }
}
