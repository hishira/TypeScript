use crate::core::valueObject::value_object::ValueObject;

use super::location::Location;

pub struct Address {
    pub address: String,
    pub house: String,
    pub door: Option<String>,
    pub city: String,
    pub country: String,
    pub location: Location,
    pub postal_code: String,
    pub fax: Option<String>,
    pub phone: Option<String>,
}

impl ValueObject for Address {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_address_creation() {
        let location = Location { latitude: 45.0, longitude: 90.0 };
        let address = Address {
            address: String::from("123 Main St"),
            house: String::from("10A"),
            door: Some(String::from("2B")),
            city: String::from("Warsaw"),
            country: String::from("Poland"),
            location,
            postal_code: String::from("00-001"),
            fax: Some(String::from("123456789")),
            phone: Some(String::from("987654321")),
        };

        assert_eq!(address.address, "123 Main St");
        assert_eq!(address.house, "10A");
        assert_eq!(address.door, Some(String::from("2B")));
        assert_eq!(address.city, "Warsaw");
        assert_eq!(address.country, "Poland");
        assert_eq!(address.postal_code, "00-001");
        assert_eq!(address.fax, Some(String::from("123456789")));
        assert_eq!(address.phone, Some(String::from("987654321")));
        assert_eq!(address.location.latitude, 45.0);
        assert_eq!(address.location.longitude, 90.0);
    }

    #[test]
    fn test_address_creation_without_optional_fields() {
        let location = Location { latitude: 45.0, longitude: 90.0 };
        let address = Address {
            address: String::from("123 Main St"),
            house: String::from("10A"),
            door: None,
            city: String::from("Warsaw"),
            country: String::from("Poland"),
            location,
            postal_code: String::from("00-001"),
            fax: None,
            phone: None,
        };

        assert_eq!(address.address, "123 Main St");
        assert_eq!(address.house, "10A");
        assert_eq!(address.door, None);
        assert_eq!(address.city, "Warsaw");
        assert_eq!(address.country, "Poland");
        assert_eq!(address.postal_code, "00-001");
        assert_eq!(address.fax, None);
        assert_eq!(address.phone, None);
        assert_eq!(address.location.latitude, 45.0);
        assert_eq!(address.location.longitude, 90.0);
    }
}