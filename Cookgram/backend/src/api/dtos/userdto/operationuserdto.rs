use serde::Deserialize;
use validator::{Validate, ValidationError};

use crate::{api::dtos::addressdto::createaddressdto::CreateAddressDto, core::role::role::Roles};

use super::personalinformationdto::PersolanInformationDTO;

#[derive(Debug, Validate, Deserialize, Clone)]
#[serde(rename_all(serialize = "camelCase", deserialize = "snake_case"))]
pub struct UserCreditionalDto {
    #[validate(length(min = 1, message = "Can not be empty"))]
    pub username: String,
    #[validate(length(min = 6, message = "Passoword length must have exceed 6"))]
    pub password: String,
    pub password_is_temporary: Option<bool>,
}

#[derive(Debug, Validate, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct CreateUserDto {
    #[validate(email)]
    pub email: String,
    pub role: Option<Roles>,
    pub personal_information: PersolanInformationDTO,
    pub creditionals: UserCreditionalDto,
    pub address: Option<CreateAddressDto>,
}

#[derive(Debug, Validate, Deserialize)]
pub struct UpdateUserDto {
    #[validate(length(min = 1))]
    pub username: String,
    #[validate(length(min = 6))]
    pub password: Option<String>,
    pub role: Option<Roles>,
    pub personal_information: PersolanInformationDTO,
    pub(crate) email: Option<Option<String>>,

}

#[derive(Debug, Validate, Deserialize)]
pub struct DeleteUserDto {
    pub id: uuid::Uuid,
    pub username: Option<String>,
    pub email: Option<String>,
}
#[derive(Debug, Validate, Deserialize, Clone)]
#[validate(schema(function = "validatete_auth", skip_on_field_errors = true))]
pub struct UserAuthDto {
    pub username: Option<String>,
    pub email: Option<String>,
    pub password: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct UserRegisterDto {
    pub username: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 6))]
    pub password: String,
}

pub fn validatete_auth(user_auth_dto: &UserAuthDto) -> Result<(), ValidationError> {
    match (user_auth_dto.username.clone(), user_auth_dto.email.clone()) {
        (None, None) => Err(ValidationError::new("Username or email should be giver")),
        (None, Some(_)) => Ok(()),
        (Some(_), None) => Ok(()),
        (Some(_), Some(_)) => Ok(()),
    }
}
