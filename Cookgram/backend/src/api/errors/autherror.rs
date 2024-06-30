use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Deserialize, Serialize)]
pub enum AuthError {
    WrongCredentials,
    MissingCredentials,
    TokenCreation,
    InvalidToken,
    UserNotExists,
    BCryptError,
    Unauthorized,
    TokenExpire,
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AuthError::WrongCredentials => (StatusCode::UNAUTHORIZED, "Wrong credentials"),
            AuthError::MissingCredentials => (StatusCode::BAD_REQUEST, "Missing credentials"),
            AuthError::TokenCreation => (StatusCode::INTERNAL_SERVER_ERROR, "Token creation error"),
            AuthError::InvalidToken => (StatusCode::BAD_REQUEST, "Invalid token"),
            AuthError::UserNotExists => (StatusCode::OK, "User with that credintionals not exists"),
            AuthError::BCryptError => (StatusCode::INTERNAL_SERVER_ERROR, "Server error occur"),
            AuthError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "User are not allowed to take action",
            ),
            AuthError::TokenExpire => (StatusCode::UNAUTHORIZED, "You are unauthorized"),
        };
        let body = Json(json!({
            "error": error_message,
        }));
        (status, body).into_response()
    }
}
