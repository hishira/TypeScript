use crate::core::address::{address::Address, location::Location};
use serde::Deserialize;
use validator::Validate;

#[derive(Debug, Validate, Deserialize)]
pub struct UpdateAddressDto {
    pub user_id: uuid::Uuid,
    pub address_id: uuid::Uuid,
    pub address: Option<String>,
    pub house: Option<String>,
    pub door: Option<String>,
    pub city: Option<String>,
    pub country: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub postal_code: Option<String>,
}

pub fn build_address_based_on_update_dto_and_address(
    update_dto: UpdateAddressDto,
    address: Address,
) -> Address {
    Address::new(
        update_dto.address.unwrap_or(address.address),
        update_dto.house.unwrap_or(address.house),
        update_dto.door.or(address.door),
        update_dto.city.unwrap_or(address.city),
        update_dto.country.unwrap_or(address.country),
        Location {
            latitude: update_dto.latitude.or(address.location.latitude),
            longitude: update_dto.longitude.or(address.location.longitude),
        },
        update_dto.postal_code.unwrap_or(address.postal_code),
    )
}
#[cfg(test)]
mod tests {
    use super::*;
    use uuid::Uuid;

    #[test]
    fn test_build_address_based_on_update_dto_and_address() {
        let address = Address::new(
            "123 Main St".to_string(),
            "10".to_string(),
            Some("1A".to_string()),
            "New York".to_string(),
            "USA".to_string(),
            Location {
                latitude: Some(40.7128),
                longitude: Some(-74.0060),
            },
            "10001".to_string(),
        );

        let update_dto = UpdateAddressDto {
            user_id: Uuid::new_v4(),
            address_id: Uuid::new_v4(),
            address: Some("456 Elm St".to_string()),
            house: Some("20".to_string()),
            door: None,
            city: Some("Los Angeles".to_string()),
            country: Some("USA".to_string()),
            latitude: Some(34.0522),
            longitude: Some(-118.2437),
            postal_code: Some("90001".to_string()),
        };

        let updated_address = build_address_based_on_update_dto_and_address(update_dto, address);

        assert_eq!(updated_address.address, "456 Elm St");
        assert_eq!(updated_address.house, "20");
        assert_eq!(updated_address.door, Some("1A".to_string())); // door remains unchanged
        assert_eq!(updated_address.city, "Los Angeles");
        assert_eq!(updated_address.country, "USA");
        assert_eq!(updated_address.location.latitude, Some(34.0522));
        assert_eq!(updated_address.location.longitude, Some(-118.2437));
        assert_eq!(updated_address.postal_code, "90001");
    }
}
