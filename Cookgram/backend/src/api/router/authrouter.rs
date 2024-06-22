use std::borrow::Borrow;

use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::post,
    Json, Router,
};
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
        appstate::appstate::AppState,
        dtos::userdto::userdto::{UserAuthDto, UserFilterOption, UserRegisterDto},
        queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery},
        repositories::{
            eventrepository::EventRepository, repositories::Repository,
            userrepositories::UserRepositories,
        },
        utils::{jwt::jwt::Claims, password_worker::password_worker::PasswordWorker},
        validators::dtovalidator::ValidateDtos,
    },
    core::user::user::User,
    database::init::Database,
};

use super::router::ApplicationRouter;

pub struct Keys {
    pub encoding: EncodingKey,
    pub decoding: DecodingKey,
}

impl Keys {
    fn new(secret: &[u8]) -> Self {
        Self {
            encoding: EncodingKey::from_secret(secret),
            decoding: DecodingKey::from_secret(secret),
        }
    }
}
pub static KEYS: Lazy<Keys> = Lazy::new(|| {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET must be set");
    Keys::new(secret.as_bytes())
});
#[derive(Debug, Validate, Deserialize, Serialize)]
pub struct AuthBody {
    access_token: String,
    refresh_token: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum AuthError {
    WrongCredentials,
    MissingCredentials,
    TokenCreation,
    InvalidToken,
    UserNotExists,
    BCryptError,
    Unauthorized,
}
pub struct AuthRouter {
    user_repo: UserRepositories,
    event_repo: EventRepository,
}

impl AuthRouter {
    pub fn new(database: &Database) -> Self {
        Self {
            user_repo: UserRepositories {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                    .unwrap(),
                user_queries: UserQuery::new(None, None, None),
                db_context: database.get_mongo_database(),
            },
            event_repo: EventRepository {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                    .unwrap(),
                event_query: EventQuery {},
            },
        }
    }
    fn prepare_claims(params: &UserAuthDto) -> Claims {
        match (params.email.clone(), params.username.clone()) {
            (None, None) => Claims {
                user_id: None,
                user_info: "TEst".to_string(),
                exp: 2000000000, // May 2033
                role: None,
            },
            (None, Some(username)) => Claims {
                user_id: None,
                user_info: username,
                exp: 2000000000, // May 2033
                role: None,
            },
            (Some(email), None) => Claims {
                user_id: None,
                user_info: email,
                exp: 2000000000, // May 2033
                role: None,
            },
            (Some(_), Some(username)) => Claims {
                user_id: None,
                user_info: username,
                exp: 2000000000, // May 2033
                role: None,
            },
        }
    }

    async fn register<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<UserRegisterDto>,
    ) -> Result<Json<User>, AuthError> {
        todo!();
    }

    async fn login<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<UserAuthDto>,
    ) -> Result<Json<AuthBody>, AuthError>
    where
        T: Repository<User, UserFilterOption>,
    {
        let mut claims: Claims = AuthRouter::prepare_claims(&params);
        let filter = UserFilterOption {
            username: Some(claims.user_info.clone()),
            limit: Some(10),
            offset: Some(0),
            owner_id: None,
        };
        let users = state.repo.find(filter.clone()).await;
        if users.len() <= 0 {
            return Result::Err(AuthError::UserNotExists);
        }
        let user = users.get(0).unwrap();
        claims.user_id = Some(user.id);
        claims.role = Some(user.role.clone());
        let token = encode(&Header::default(), &claims, &KEYS.encoding)
            .map_err(|_| AuthError::TokenCreation)?;
        match state
            .pass_worker
            .verify(params.password, user.password.clone())
            .await
        {
            Ok(bcrypt_verify_respoonse) => {
                if bcrypt_verify_respoonse {
                    Ok(Json(AuthBody {
                        access_token: token.clone(),
                        refresh_token: token.clone(),
                    }))
                } else {
                    Result::Err(AuthError::WrongCredentials)
                }
            }
            Err(_) => Result::Err(AuthError::BCryptError),
        }
    }
}

impl ApplicationRouter for AuthRouter {
    fn get_router(&self) -> axum::Router {
        Router::new()
            .route("/login", post(AuthRouter::login))
            .with_state(AppState {
                repo: self.user_repo.clone(),
                event_repo: self.event_repo.clone(),
                pass_worker: PasswordWorker::new(10, 4).unwrap(),
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
            AuthError::UserNotExists => (StatusCode::BAD_REQUEST, "User not Exists"),
            AuthError::BCryptError => (StatusCode::INTERNAL_SERVER_ERROR, "Server error occur"),
            AuthError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "User are not allowed to take action",
            ),
        };
        let body = Json(json!({
            "error": error_message,
        }));
        (status, body).into_response()
    }
}
