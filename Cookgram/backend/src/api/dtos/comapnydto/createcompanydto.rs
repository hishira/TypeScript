use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::{
    api::dtos::addressdto::createaddressdto::CreateAddressDto,
    core::address::{address::Address, location::Location},
};

#[derive(Deserialize, Validate, Serialize)]
pub struct ComapnyAddressDto {
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
#[derive(Deserialize, Serialize)]
pub struct CreateCompanyDto {
    pub name: String,
    pub address: ComapnyAddressDto,
}

pub fn convert_to_address(create_company_dto: ComapnyAddressDto) -> Address {
    Address::new(
        create_company_dto.address.clone(),
        create_company_dto.house.clone(),
        create_company_dto.door.clone(),
        create_company_dto.city.clone(),
        create_company_dto.country.clone(),
        Location {
            latitude: create_company_dto.latitude,
            longitude: create_company_dto.longitude,
        },
        create_company_dto.postal_code.clone(),
    )
}
