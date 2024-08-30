use serde::Deserialize;
use uuid::Uuid;
use validator::{Validate, ValidationError};

use crate::{
    api::{dtos::addressdto::createaddressdto::CreateAddressDto, utils::jwt::jwt::Claims},
    core::role::role::Roles,
};

#[derive(Debug, Validate, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserCreditionalDto {
    #[validate(length(min = 1, message = "Can not be empty"))]
    pub username: String,
    #[validate(length(min = 6, message = "Passoword length must have exceed 6"))]
    pub password: String,
    pub password_is_temporary: Option<bool>,
}

#[derive(Debug, Validate, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateUserDto {
    pub creditionals: UserCreditionalDto,
    #[validate(email)]
    pub email: String,
    pub role: Option<Roles>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub address: Option<CreateAddressDto>,
}

#[derive(Debug, Validate, Deserialize)]
pub struct UpdateUserDto {
    #[validate(length(min = 1))]
    pub username: String,
    #[validate(length(min = 6))]
    pub password: Option<String>,
    #[validate(email)]
    pub email: Option<String>,
    pub role: Option<Roles>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
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

trait Filter: Send + Sync {}

#[derive(Clone, Deserialize)]
pub struct UserFilterOption {
    pub username: Option<String>,
    pub limit: Option<i16>,
    pub offset: Option<i16>,
    pub owner_id: Option<Uuid>,
    pub with_admin: Option<bool>,
}

impl UserFilterOption {
    pub fn from_claims(claims: Claims) -> Self {
        Self {
            username: Some(claims.user_info.clone()),
            limit: Some(10),
            offset: Some(0),
            owner_id: None,
            with_admin: Some(true),
        }
    }

    pub fn from_only_usernamr(username: String) -> Self {
        Self {
            username: Some(username),
            limit: Some(10),
            offset: Some(0),
            owner_id: None,
            with_admin: Some(true),
        }
    }
}

pub fn validatete_auth(user_auth_dto: &UserAuthDto) -> Result<(), ValidationError> {
    match (user_auth_dto.username.clone(), user_auth_dto.email.clone()) {
        (None, None) => Err(ValidationError::new("Username or email should be giver")),
        (None, Some(_)) => Ok(()),
        (Some(_), None) => Ok(()),
        (Some(_), Some(_)) => Ok(()),
    }
}

pub enum UserDtos {
    Create(CreateUserDto),
    Update(UpdateUserDto),
    Delete(DeleteUserDto),
}

#[derive(Debug, Deserialize)]
pub struct UserParamsDto {
    id: Option<uuid::Uuid>,
}
#[cfg(test)]
mod tests {
    use validator::ValidationErrors;

    use super::*;

    // Helper function to validate DTOs and return validation errors if any
    fn validate_dto(dto: &dyn Validate) -> Option<ValidationErrors> {
        match dto.validate() {
            Ok(_) => None,
            Err(err) => Some(err),
        }
    }

    // Test cases for CreateUserDto
    #[test]
    fn test_create_user_dto_validation_success() {
        // Create a valid CreateUserDto
        let valid_dto = CreateUserDto {
            creditionals: UserCreditionalDto {
                username: "valid_username".to_string(),
                password: "valid_password".to_string(),
                password_is_temporary: Some(false),

            },
            email: "valid@example.com".to_string(),
            role: Some(Roles::user_role()),
            first_name: None,
            last_name: None,
            address: None,
        };

        // Validate the DTO
        let validation_errors = validate_dto(&valid_dto);

        // Assert that validation succeeds (no errors)
        assert!(validation_errors.is_none());
    }

    #[test]
    fn test_create_user_dto_validation_failure() {
        // Create an invalid CreateUserDto with empty username and short password
        let invalid_dto = CreateUserDto {
            creditionals: UserCreditionalDto {
                username: "".to_string(),
                password: "short".to_string(),
                password_is_temporary: Some(false),

            },            
            email: "invalid_email".to_string(), // Invalid email intentionally
            role: Some(Roles::user_role()),
            first_name: None,
            last_name: None,
            address: None,
        };

        // Validate the DTO
        let validation_errors = validate_dto(&invalid_dto).unwrap();

        // Assert that validation fails with expected errors
        assert_eq!(validation_errors.field_errors().len(), 3); // 3 fields being validated
    }

    // Test cases for UpdateUserDto (similar to CreateUserDto)
    #[test]
    fn test_update_user_dto_validation_success() {
        let valid_dto = UpdateUserDto {
            username: "valid_username".to_string(),
            password: Some("valid_password".to_string()),
            email: Some("valid@example.com".to_string()),
            role: None,
            first_name: None,
            last_name: None,
        };

        let validation_errors = validate_dto(&valid_dto);
        assert!(validation_errors.is_none());
    }

    #[test]
    fn test_update_user_dto_validation_failure() {
        let invalid_dto = UpdateUserDto {
            username: "".to_string(),
            password: Some("short".to_string()),
            email: Some("invalid_email".to_string()),
            role: None,
            first_name: None,
            last_name: None,
        };

        let validation_errors = validate_dto(&invalid_dto).unwrap();

        assert_eq!(validation_errors.field_errors().len(), 3);
    }
}
