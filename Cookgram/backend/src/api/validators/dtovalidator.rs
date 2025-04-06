use axum::{extract::{rejection::JsonRejection, FromRequest, Request}, Json};
use serde::{de::DeserializeOwned, Deserialize};
use validator::Validate;
use async_trait::async_trait;

use crate::api::errors::validationerror::ServerError;

#[derive(Debug, Clone, Copy, Default, Deserialize)]
pub struct ValidateDtos<T>(pub T);

#[async_trait]
impl<T, S> FromRequest<S> for ValidateDtos<T>
where
    T: DeserializeOwned + Validate ,
    S: Send + Sync,
    Json<T>: FromRequest<S, Rejection = JsonRejection>,
{
    type Rejection = ServerError;

    async fn from_request(req: Request, state: &S) -> Result<Self, Self::Rejection>{
        let Json(value) = Json::<T>::from_request(req, state).await?;
        let result = value.validate();
        match result {
            Ok(_) =>  Ok(ValidateDtos(value)),
            Err(error) => {
                tracing::error!("Error in validation: {}", error);
                Err(ServerError::ValidationError(error))
            }
        }
    }
}