use axum::{http::StatusCode, response::IntoResponse};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum UserError {
    #[error(transparent)]
    CreateError(sqlx::Error)
}

impl IntoResponse for UserError {
    fn into_response(self) -> axum::response::Response {
        match self {
            UserError::CreateError(_) => {
                let message = format!("Error occur while user create");
                (StatusCode::BAD_REQUEST ,message)
            }
        }.into_response()
    }
}