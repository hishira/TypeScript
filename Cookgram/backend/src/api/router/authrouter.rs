use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::post,
    Json, Router,
};
use jsonwebtoken::{encode, DecodingKey, EncodingKey, Header};
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{Pool, Postgres};
use validator::Validate;

use crate::{
    api::{
        appstate::appstate::AppState, daos::userdao::UserDAO, dtos::userdto::userdto::{UserAuthDto, UserFilterOption, UserRegisterDto}, errors::autherror::AuthError, queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery}, repositories::{
            eventrepository::EventRepository, repositories::Repository,
            userrepositories::UserRepositories,
        }, utils::{jwt::jwt::Claims, password_worker::password_worker::PasswordWorker}, validators::dtovalidator::ValidateDtos
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
                user_dao: UserDAO {
                    pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                        .unwrap(),
                    db_context: database.get_mongo_database(),
                },
            },
            event_repo: EventRepository {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                    .unwrap(),
                event_query: EventQuery {},
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
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        let mut claims: Claims = Claims::new(&params);
        let filter = UserFilterOption {
            username: Some(claims.user_info.clone()),
            limit: Some(10),
            offset: Some(0),
            owner_id: None,
        };
        let users = state.repo.find(filter.clone()).await;
        let users = match users {
            Ok(u) => u,
            Err(error) => {
                tracing::error!("Error occur, {}", error);
                vec![]
            }
        };
        if users.len() <= 0 {
            return Result::Err(AuthError::UserNotExists);
        }
        let user = users.get(0).unwrap();
        println!("{}", user.email);
        claims.user_id = Some(user.id);
        claims.role = Some(user.role.clone());
        let token = encode(&Header::default(), &claims, &KEYS.encoding).map_err(|e| {
            tracing::error!("Error occur while token creation, {}", e);
            return AuthError::TokenCreation;
        })?;
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

