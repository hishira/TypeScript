use axum::{extract::rejection::JsonRejection, http::StatusCode, response::{IntoResponse, Response}, Json};
use thiserror::Error;


#[derive(Debug, Error)]
pub enum ServerError {
    #[error(transparent)]
    ValidationError(#[from] validator::ValidationErrors),

    #[error(transparent)]
    AxumFormRejection(#[from] JsonRejection),
}

impl IntoResponse for ServerError {
    fn into_response(self) -> Response {
        match self {
            ServerError::ValidationError(_) => {
                let message = format!("Input validation error: [{self}]").replace('\n', ", ");
                (StatusCode::BAD_REQUEST, message)
            }
            ServerError::AxumFormRejection(_) => {
                println!("In proper body");
                (StatusCode::BAD_REQUEST, self.to_string())
            }
        }
        .into_response()
    }
}