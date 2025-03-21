use crate::core::address::{address::Address, location::Location};
use serde::Deserialize;
use validator::Validate;

#[derive(Debug, Validate, Deserialize, Clone)]
#[serde(rename_all(serialize = "camelCase", deserialize = "snake_case"))]
pub struct CreateAddressDto {
    //pub user_id: uuid::Uuid,
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
}

#[derive(Debug, Validate, Deserialize)]
pub struct CreateUserAddressDto {
    pub user_id: uuid::Uuid,
    pub address: CreateAddressDto,
}

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
    )
}
#[cfg(test)]
mod tests {
    use super::*;
    use validator::Validate;

    #[test]
    fn test_create_address_dto_valid() {
        let dto = CreateAddressDto {
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
        };

        assert!(dto.validate().is_ok());
    }

    #[test]
    fn test_create_address_dto_invalid_empty_address() {
        let dto = CreateAddressDto {
            address: "".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let binding = validation_result.unwrap_err();
        let errors = binding.field_errors();
        assert!(errors.contains_key("address"));
    }

    #[test]
    fn test_create_address_dto_invalid_empty_house() {
        let dto = CreateAddressDto {
            address: "123 Example Street".to_string(),
            house: "".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let binding = validation_result.unwrap_err();
        let errors = binding.field_errors();
        assert!(errors.contains_key("house"));
    }

    #[test]
    fn test_create_address_dto_invalid_empty_city() {
        let dto = CreateAddressDto {
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let binding = validation_result.unwrap_err();
        let errors = binding.field_errors();
        assert!(errors.contains_key("city"));
    }

    #[test]
    fn test_create_address_dto_invalid_empty_postal_code() {
        let dto = CreateAddressDto {
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "".to_string(),
        };

        let validation_result = dto.validate();
        assert!(validation_result.is_err());
        let binding = validation_result.unwrap_err();
        let errors = binding.field_errors();
        assert!(errors.contains_key("postal_code"));
    }

    #[test]
    fn test_build_address_based_on_create_dto() {
        let dto = CreateAddressDto {
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
        };

        let copy_dto = CreateAddressDto {
            address: "123 Example Street".to_string(),
            house: "A1".to_string(),
            door: Some("3B".to_string()),
            city: "Example City".to_string(),
            country: "Example Country".to_string(),
            latitude: Some(51.5074),
            longitude: Some(-0.1278),
            postal_code: "12345".to_string(),
        };
        let address = build_address_based_on_create_dto(dto);

        assert_eq!(address.address, copy_dto.address);
        assert_eq!(address.house, copy_dto.house);
        assert_eq!(address.door, copy_dto.door);
        assert_eq!(address.city, copy_dto.city);
        assert_eq!(address.country, copy_dto.country);
        assert_eq!(address.location.latitude, copy_dto.latitude);
        assert_eq!(address.location.longitude, copy_dto.longitude);
        assert_eq!(address.postal_code, copy_dto.postal_code);
    }
}
