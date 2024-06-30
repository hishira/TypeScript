use axum::{async_trait, extract::FromRequestParts, http::request::Parts, RequestPartsExt};
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use jsonwebtoken::{decode, errors::ErrorKind, get_current_timestamp, Algorithm, Validation};
use serde::{Deserialize, Serialize};

use crate::{
    api::{
        dtos::userdto::userdto::UserAuthDto, errors::autherror::AuthError, router::authrouter::KEYS,
    },
    core::role::role::Roles,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub user_id: Option<uuid::Uuid>,
    pub user_info: String,
    pub role: Option<Roles>,
    pub exp: u64,
}

impl Claims {
    fn prepare_exp() -> u64 {
        get_current_timestamp() + 300000
    }
    pub fn new(params: &UserAuthDto) -> Self {
        match (params.email.clone(), params.username.clone()) {
            (None, None) => Self {
                user_id: None,
                user_info: "TEst".to_string(),
                exp: Self::prepare_exp(),
                role: None,
            },
            (None, Some(username)) => Self {
                user_id: None,
                user_info: username,
                exp: Self::prepare_exp(),
                role: None,
            },
            (Some(email), None) => Self {
                user_id: None,
                user_info: email,
                exp: Self::prepare_exp(),
                role: None,
            },
            (Some(_), Some(username)) => Self {
                user_id: None,
                user_info: username,
                exp: Self::prepare_exp(),
                role: None,
            },
        }
    }
}

#[async_trait]
impl<S> FromRequestParts<S> for Claims
where
    S: Send + Sync,
{
    type Rejection = AuthError;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let mut validation = Validation::new(Algorithm::HS256);
        validation.set_required_spec_claims(&["exp"]);

        let TypedHeader(Authorization(bearer)) = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await
            .map_err(|_| AuthError::InvalidToken)?;
        let token_data =
            decode::<Claims>(bearer.token(), &KEYS.decoding, &validation).map_err(|error| {
                match *error.kind() {
                    ErrorKind::ExpiredSignature => AuthError::TokenExpire,
                    _ => AuthError::InvalidToken,
                }
            })?;
        Ok(token_data.claims)
    }
}
