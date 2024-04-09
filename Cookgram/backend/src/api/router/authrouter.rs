use std::borrow::Borrow;

use axum::{extract::State, http::StatusCode, response::{IntoResponse, Response}, routing::post, Json, Router};
use bcrypt::verify;
use dotenv::dotenv;
use jsonwebtoken::{encode, DecodingKey, EncodingKey, Header};
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{Pool, Postgres};
use validator::Validate;

use crate::{
    api::{
        appstate::appstate::AppState, dtos::userdto::userdto::{UserAuthDto, UserFilterOption}, queries::userquery::userquery::UserQuery, repositories::{repositories::Repository, userrepositories::UserRepositories}, utils::jwt::jwt::Claims, validators::dtovalidator::ValidateDtos
    },
    core::user::user::User, database::init::Database,
};

use super::router::ApplicationRouter;

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
#[derive(Debug,Validate, Deserialize, Serialize)]
pub struct AuthBody {
    access_token: String,
    refresh_token: String,
}

#[derive(Debug, Deserialize, Serialize)]
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
    pub fn new(database: &Database) -> Self {
        Self {
            user_repo: UserRepositories {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool).unwrap(),
                user_queries: UserQuery::new(None, None, None),
            },
        }
    }
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
        let users = state.repo.find(filter).await;
        let user = users.get(0).unwrap();
        claims.user_id = Some(user.id);
        let token = encode(&Header::default(), &claims, &KEYS.encoding)
            .map_err(|_| AuthError::TokenCreation)?;
        match verify(params.password, &user.password) {
            Ok(_) => Ok(Json(AuthBody {
                access_token: token.clone(),
                refresh_token: token.clone(),
            })),
            Err(_) => Result::Err(AuthError::WrongCredentials),
        }
    }
}

impl ApplicationRouter for AuthRouter {
    fn get_router(&self) -> axum::Router {
        Router::new()
            .route("/login", post(AuthRouter::login))
            .with_state(AppState {
                repo: self.user_repo.clone(),
            })
    }
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AuthError::WrongCredentials => (StatusCode::UNAUTHORIZED, "Wrong credentials"),
            AuthError::MissingCredentials => (StatusCode::BAD_REQUEST, "Missing credentials"),
            AuthError::TokenCreation => (StatusCode::INTERNAL_SERVER_ERROR, "Token creation error"),
            AuthError::InvalidToken => (StatusCode::BAD_REQUEST, "Invalid token"),
        };
        let body = Json(json!({
            "error": error_message,
        }));
        (status, body).into_response()
    }
}
