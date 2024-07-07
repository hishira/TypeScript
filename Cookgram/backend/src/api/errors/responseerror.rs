use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};
use serde_json::json;

use super::autherror::AuthError;

#[derive(Debug)]
pub enum ResponseError {
    DatabaseError(String),
    AuthError(AuthError),
    CustomError(String),
}

impl From<sqlx::Error> for ResponseError {
    fn from(value: sqlx::Error) -> Self {
        ResponseError::DatabaseError(format!("Database error: {}", value))
    }
}

impl ResponseError {
    pub fn get_status_and_message(&self) -> (StatusCode, &str) {
        match self {
            ResponseError::DatabaseError(error) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                error.as_str(),
            ),
            ResponseError::AuthError(auth_error) => auth_error.get_status_and_message(),
            ResponseError::CustomError(string_value) => {
                (StatusCode::UNPROCESSABLE_ENTITY, string_value.as_str())
            }
        }
    }
}
impl IntoResponse for ResponseError {
    fn into_response(self) -> axum::response::Response {
        let (status, error_message) = self.get_status_and_message();
        let body = Json(json!({
            "error": error_message,
        }));
        return (status, body).into_response();
    }
}
