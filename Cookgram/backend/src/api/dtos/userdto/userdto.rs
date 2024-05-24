use serde::Deserialize;
use validator::{Validate, ValidationError, ValidationErrors};

#[derive(Debug, Validate, Deserialize)]
pub struct CreateUserDto {
    #[validate(length(min = 1, message = "Can not be empty"))]
    pub username: String,
    #[validate(length(min = 6, message = "Passoword length must have exceed 6"))]
    pub password: String,
    #[validate(email)]
    pub email: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct UpdateUserDto {
    #[validate(length(min = 1))]
    pub username: String,
    #[validate(length(min = 6))]
    pub password: String,
    #[validate(email)]
    pub email: String,
}

#[derive(Debug, Validate, Deserialize)]
pub struct DeleteUserDto {
    pub id: uuid::Uuid,
    pub username: String,
}
#[derive(Debug, Validate, Deserialize)]
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
            username: "valid_username".to_string(),
            password: "valid_password".to_string(),
            email: "valid@example.com".to_string(),
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
            username: "".to_string(),
            password: "short".to_string(),
            email: "invalid_email".to_string(), // Invalid email intentionally
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
            password: "valid_password".to_string(),
            email: "valid@example.com".to_string(),
        };

        let validation_errors = validate_dto(&valid_dto);
        assert!(validation_errors.is_none());
    }

    #[test]
    fn test_update_user_dto_validation_failure() {
        let invalid_dto = UpdateUserDto {
            username: "".to_string(),
            password: "short".to_string(),
            email: "invalid_email".to_string(),
        };

        let validation_errors = validate_dto(&invalid_dto).unwrap();

        assert_eq!(validation_errors.field_errors().len(), 3);
    }
}
