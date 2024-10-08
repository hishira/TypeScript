use axum::{async_trait, extract::FromRequestParts, http::request::Parts, RequestPartsExt};
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use jsonwebtoken::{get_current_timestamp, Algorithm, Validation};
use serde::{Deserialize, Serialize};

use crate::{
    api::{dtos::userdto::userdto::UserAuthDto, errors::autherror::AuthError},
    core::{role::role::Roles, user::user::User},
};

use super::keys::Keys;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub user_id: uuid::Uuid,
    pub user_info: String,
    pub role: Option<Roles>,
    pub exp: u64,
}

impl Claims {
    fn prepare_exp(extended_time: Option<u64>) -> u64 {
        500 + extended_time.unwrap_or_default()
    }

    pub fn get_token_validation() -> Validation {
        let mut validation = Validation::new(jsonwebtoken::Algorithm::HS256);
        validation.set_required_spec_claims(&["exp"]);
        return validation;
    }

    pub fn refresh_token_expired_token(refresh_token: String) -> Result<String, AuthError> {
        let refresh_token_validation: Validation = Self::get_token_validation();
        let token_data = Keys::decode(&refresh_token, refresh_token_validation)?;
        Ok(Keys::encode(&token_data.claims)?)
    }

    pub fn new(timestamp: u64, params: &UserAuthDto, extended_time: Option<u64>, user: User) -> Self {
        let exp = timestamp + Self::prepare_exp(extended_time);
        match (params.email.clone(), params.username.clone()) {
            (None, None) => Self {
                user_id: user.id.get_id(),
                user_info: "TEst".to_string(),
                exp,
                role: Some(user.role),
            },
            (None, Some(username)) => Self {
                user_id: user.id.get_id(),
                user_info: username,
                exp,
                role: Some(user.role),
            },
            (Some(email), None) => Self {
                user_id: user.id.get_id(),
                user_info: email,
                exp,
                role: Some(user.role),
            },
            (Some(_), Some(username)) => Self {
                user_id: user.id.get_id(),
                user_info: username,
                exp,
                role: Some(user.role),
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
        let token_data = Keys::decode(bearer.token(), validation)?;
        Ok(token_data.claims)
    }
}
