use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};
use jsonwebtoken::{
    decode, encode, errors::ErrorKind, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};
use validator::Validate;

use crate::{
    api::{
        appstate::{appstate::AppState, authstate::AuthState},
        daos::{useraddressdao::UserAddressDAO, userdao::UserDAO},
        dtos::{
            tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
            userdto::userdto::{UserAuthDto, UserFilterOption, UserRegisterDto},
        },
        errors::{autherror::AuthError, responseerror::ResponseError},
        queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery},
        repositories::{
            eventrepository::EventRepository, repositories::Repository,
            userrepositories::UserRepositories,
        },
        services::authservice::AuthService,
        utils::{
            jwt::{
                jwt::Claims,
                keys::{Keys, KEYS},
                tokens::{AccessToken, JwtTokens, RefreshToken},
            },
            password_worker::password_worker::PasswordWorker,
        },
        validators::dtovalidator::ValidateDtos,
    },
    core::user::user::User,
    database::{init::Database, redis::redisdatabase::RedisDatabase},
};

use super::router::ApplicationRouter;

#[derive(Debug, Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthBody {
    access_token: String,
    refresh_token: String,
}

impl AuthBody {
    pub fn get_from_token(tokens: JwtTokens) -> Self {
        Self {
            access_token: tokens.0 .0.clone(),
            refresh_token: tokens.0 .0.clone(),
        }
    }

    pub fn empty() -> Self {
        Self {
            access_token: "".to_string(),
            refresh_token: "".to_string(),
        }
    }
}

pub struct AuthRouter {
    user_repo: UserRepositories,
    event_repo: EventRepository,
    redis: RedisDatabase,
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
                user_address_dao: UserAddressDAO {
                    db_context: database.get_mongo_database(),
                    pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                        .unwrap(),
                },
            },
            event_repo: EventRepository {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                    .unwrap(),
                event_query: EventQuery {},
            },
            redis: database.redis.clone(),
        }
    }

    async fn register<T>(
        State(state): State<AuthState>,
        ValidateDtos(params): ValidateDtos<UserRegisterDto>,
    ) -> Result<Json<User>, AuthError> {
        todo!();
    }

    async fn token_refresh(
        State(state): State<AuthState>,
        ValidateDtos(params): ValidateDtos<RefreshTokenDto>,
    ) -> Result<Json<AccessTokenDto>, ResponseError> {
        state.auth_service.refresh_token(params).await
    }

    async fn login(
        State(state): State<AuthState>,
        ValidateDtos(params): ValidateDtos<UserAuthDto>,
    ) -> Result<Json<AuthBody>, ResponseError> {
        state
            .auth_service
            .generate_tokens_if_user_exists(params)
            .await
    }
}

impl ApplicationRouter for AuthRouter {
    fn get_router(&self) -> axum::Router {
        let app_state = AppState {
            repo: self.user_repo.clone(),
            event_repo: self.event_repo.clone(),
            redis_database: self.redis.clone(),
        };
        Router::new()
            .route("/login", post(AuthRouter::login))
            .route("/refresh-token", post(AuthRouter::token_refresh))
            .with_state(AuthState {
                app_state,
                auth_service: AuthService {
                    user_repo: self.user_repo.clone(),
                    pass_worker: PasswordWorker::new(10, 4).unwrap(),
                },
            })
    }
}
