use std::borrow::Borrow;

use axum::{extract::State, Json};
use dotenv::dotenv;
use jsonwebtoken::{encode, DecodingKey, EncodingKey, Header};
use once_cell::sync::Lazy;
use serde::Deserialize;

use crate::{
    api::{
        appstate::appstate::AppState,
        dtos::userdto::userdto::{UserAuthDto, UserFilterOption},
        repositories::{repositories::Repository, userrepositories::UserRepositories},
        utils::jwt::jwt::Claims,
        validators::dtovalidator::ValidateDtos,
    },
    core::user::user::User,
};

struct Keys {
    encoding: EncodingKey,
    decoding: DecodingKey,
}

impl Keys {
    fn new(secret: &[u8]) -> Self {
        Self {
            encoding: EncodingKey::from_secret(secret),
            decoding: DecodingKey::from_secret(secret),
        }
    }
}
static KEYS: Lazy<Keys> = Lazy::new(|| {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET must be set");
    Keys::new(secret.as_bytes())
});
#[derive(Debug, Deserialize)]
pub struct AuthBody {
    access_token: String,
    refresh_token: String,
}

#[derive(Debug)]
enum AuthError {
    WrongCredentials,
    MissingCredentials,
    TokenCreation,
    InvalidToken,
}
pub struct AuthRouter {
    user_repo: UserRepositories,
}

impl AuthRouter {
    async fn login<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<UserAuthDto>,
    ) -> Result<Json<AuthBody>, AuthError>
    where
        T: Repository<User, UserFilterOption>,
    {
        let mut claims: Claims = match (params.email, params.username) {
            (None, None) => Claims {
                user_id: None,
                user_info: "TEst".to_string(),
            },
            (None, Some(username)) => Claims {
                user_id: None,
                user_info: username,
            },
            (Some(email), None) => Claims {
                user_id: None,
                user_info: email,
            },
            (Some(email), Some(password)) => Claims {
                user_id: None,
                user_info: email,
            },
        };
        let filter = UserFilterOption {
            username: Some(claims.user_info.clone()),
        };
        let user = state.repo.find(filter).await;
        claims.user_id = Some(user.get(0).unwrap().id);
        let token = encode(&Header::default(), &claims, &KEYS.encoding)
            .map_err(|_| AuthError::TokenCreation)?;
        Ok(Json(AuthBody {
            access_token: token.clone(),
            refresh_token: token.clone(),
        }))
    }
}
