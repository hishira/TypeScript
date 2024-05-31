use serde::Deserialize;
use validator::Validate;

use crate::core::address::{address::Address, location::Location};

#[derive(Debug, Validate, Deserialize)]
pub struct CreateAddressDto {
    pub user_id: uuid::Uuid,
    #[validate(length(min = 1, message = "Address can not be empty"))]
    pub address: String,
    #[validate(length(min = 1, message = "House can not be empty"))]
    pub house: String,
    pub door: Option<String>,
    #[validate(length(min = 1, message = "City can not be empty"))]
    pub city: String,
    #[validate(length(min = 1, message = "City can not be empty"))]
    pub country: String,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    #[validate(length(min = 1, message = "Postal code can not be empty"))]
    pub postal_code: String,
    pub fax: Option<String>,
    pub phone: Option<String>,
}

impl CreateAddressDto {
    pub fn build_address_based_on_create_dto(create_dto: CreateAddressDto) -> Address {
        Address::new(
            create_dto.address,
            create_dto.house,
            create_dto.door,
            create_dto.city,
            create_dto.country,
            Location {
                latitude: create_dto.latitude,
                longitude: create_dto.longitude,
            },
            create_dto.postal_code,
            create_dto.fax,
            create_dto.phone,
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use uuid::Uuid;
    use validator::Validate;

    #[test]
    fn test_create_address_dto_valid() {
        let dto = CreateAddressDto {
            user_id: Uuid::new_v4(),
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
            fax: Some("123-456-7890".to_string()),
            phone: Some("098-765-4321".to_string()),
        };

        assert!(dto.validate().is_ok());
    }

    #[test]
    fn test_create_address_dto_invalid_empty_address() {
        let dto = CreateAddressDto {
            user_id: Uuid::new_v4(),
            address: "".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
            fax: Some("123-456-7890".to_string()),
            phone: Some("098-765-4321".to_string()),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let errors = validation_result.unwrap_err().field_errors();
        assert!(errors.contains_key("address"));
    }

    #[test]
    fn test_create_address_dto_invalid_empty_house() {
        let dto = CreateAddressDto {
            user_id: Uuid::new_v4(),
            address: "123 Example Street".to_string(),
            house: "".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
            fax: Some("123-456-7890".to_string()),
            phone: Some("098-765-4321".to_string()),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let errors = validation_result.unwrap_err().field_errors();
        assert!(errors.contains_key("house"));
    }

    #[test]
    fn test_create_address_dto_invalid_empty_city() {
        let dto = CreateAddressDto {
            user_id: Uuid::new_v4(),
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
            fax: Some("123-456-7890".to_string()),
            phone: Some("098-765-4321".to_string()),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let errors = validation_result.unwrap_err().field_errors();
        assert!(errors.contains_key("city"));
    }

    #[test]
    fn test_create_address_dto_invalid_empty_postal_code() {
        let dto = CreateAddressDto {
            user_id: Uuid::new_v4(),
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "".to_string(),
            fax: Some("123-456-7890".to_string()),
            phone: Some("098-765-4321".to_string()),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let errors = validation_result.unwrap_err().field_errors();
        assert!(errors.contains_key("postal_code"));
    }

    #[test]
    fn test_build_address_based_on_create_dto() {
        let dto = CreateAddressDto {
            user_id: Uuid::new_v4(),
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
            fax: Some("123-456-7890".to_string()),
            phone: Some("098-765-4321".to_string()),
        };

        let address = CreateAddressDto::build_address_based_on_create_dto(dto.clone());

        assert_eq!(address.address, dto.address);
        assert_eq!(address.house, dto.house);
        assert_eq!(address.door, dto.door);
        assert_eq!(address.city, dto.city);
        assert_eq!(address.country, dto.country);
        assert_eq!(address.location.latitude, dto.latitude);
        assert_eq!(address.location.longitude, dto.longitude);
        assert_eq!(address.postal_code, dto.postal_code);
        assert_eq!(address.fax, dto.fax);
        assert_eq!(address.phone, dto.phone);
    }
}
