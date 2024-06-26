use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::api::dtos::addressdto::createaddressdto::CreateAddressDto;

#[derive(Deserialize,Validate, Serialize)]
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
    pub fax: Option<String>,
    pub phone: Option<String>,
}
#[derive(Deserialize, Serialize)]
pub struct CreateCompanyDto {
    pub name: String,
    pub address: ComapnyAddressDto,
}
