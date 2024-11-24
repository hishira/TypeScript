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
    WrongPasswordOrLogin,
}

const NOT_FOUND: (StatusCode, &str) = (StatusCode::NOT_FOUND, "Wrong credentials");
const WRONG_PASSWORD_OR_LOGIN: (StatusCode, &str) = (StatusCode::OK, "Wrong login or password");
const MISSING_CREDENTIALS: (StatusCode, &str) = (StatusCode::BAD_REQUEST, "Missing credentials");
const TOKEN_CREATION: (StatusCode, &str) =
    (StatusCode::INTERNAL_SERVER_ERROR, "Token creation error");
const INVALID_TOKEN: (StatusCode, &str) = (StatusCode::BAD_REQUEST, "Invalid token");
const USER_NOT_EXISTS: (StatusCode, &str) =
    (StatusCode::OK, "User with that credintionals not exists");
const BCRYPT_ERROR: (StatusCode, &str) = (StatusCode::INTERNAL_SERVER_ERROR, "Server error occur");
const UNAUTHORIZED: (StatusCode, &str) = (StatusCode::UNAUTHORIZED, "You are unauthorized");
const TOKEN_EXPIRE: (StatusCode, &str) = (StatusCode::UNAUTHORIZED, "You are unauthorized");

impl AuthError {
    pub fn get_status_and_message(&self) -> (StatusCode, &str) {
        match self {
            AuthError::WrongCredentials => NOT_FOUND,
            AuthError::WrongPasswordOrLogin => WRONG_PASSWORD_OR_LOGIN,
            AuthError::MissingCredentials => MISSING_CREDENTIALS,
            AuthError::TokenCreation => TOKEN_CREATION,
            AuthError::InvalidToken => INVALID_TOKEN,
            AuthError::UserNotExists => USER_NOT_EXISTS,
            AuthError::BCryptError => BCRYPT_ERROR,
            AuthError::Unauthorized => UNAUTHORIZED,
            AuthError::TokenExpire => TOKEN_EXPIRE,
        }
    }
}
impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        let (status, error_message) = self.get_status_and_message();
        let body = Json(json!({
            "error": error_message,
        }));
        (status, body).into_response()
    }
}
