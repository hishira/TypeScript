use axum::{extract::State, routing::post, Json, Router};

use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};
use validator::Validate;

use crate::{
    api::{
        appstate::{appstate::AppState, authstate::AuthState},
        daos::
            authenticationdao::AuthenticationDAO
        ,
        dtos::{
            tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
            userdto::operationuserdto::{UserAuthDto, UserRegisterDto},
        },
        errors::{autherror::AuthError, responseerror::ResponseError},
        queries::eventquery::eventquery::EventQuery,
        repositories::{
            authenticationrepository::AuthenticationRepository, eventrepository::EventRepository,
        },
        services::authservice::AuthService,
        utils::password_worker::password_worker::PasswordWorker,
        validators::dtovalidator::ValidateDtos,
    },
    core::user::user::User,
    database::{init::Database, redis::redisdatabase::RedisDatabase},
};

use super::router::ApplicationRouter;

#[derive(Debug, Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthDTO {
    pub access_token: String,
    pub refresh_token: String,
}
pub struct AuthRouter {
    auth_repo: AuthenticationRepository,
    event_repo: EventRepository,
    redis: RedisDatabase,
}

impl AuthRouter {
    pub fn new(database: &Database) -> Self {
        Self {
            event_repo: EventRepository {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                    .unwrap(),
                event_query: EventQuery {},
            },
            auth_repo: AuthenticationRepository {
                db: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool).unwrap(),
                db_context: database.get_mongo_database(),
                auth_dao: AuthenticationDAO {
                    pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                        .unwrap(),
                },
            },
            redis: database.redis.clone(),
        }
    }

    async fn _register<T>(
        State(_): State<AuthState>,
        ValidateDtos(_): ValidateDtos<UserRegisterDto>,
    ) -> Result<Json<User>, AuthError> {
        todo!();
    }

    async fn token_refresh(
        State(state): State<AuthState>,
        ValidateDtos(params): ValidateDtos<RefreshTokenDto>,
    ) -> Result<Json<AccessTokenDto>, ResponseError> {
        state.auth_service.get_refresh_token(params).await
    }

    async fn login(
        State(state): State<AuthState>,
        ValidateDtos(params): ValidateDtos<UserAuthDto>,
    ) -> Result<Json<AuthDTO>, ResponseError> {
        state
            .auth_service
            .generate_tokens_if_user_exists(params)
            .await
    }
}

impl ApplicationRouter for AuthRouter {
    fn get_router(&self) -> axum::Router {
        let app_state = AppState {
            repo: self.auth_repo.clone(),
            event_repo: self.event_repo.clone(),
            redis_database: self.redis.clone(),
        };
        Router::new()
            .route("/login", post(AuthRouter::login))
            .route("/refresh-token", post(AuthRouter::token_refresh))
            .with_state(AuthState {
                app_state,
                auth_service: AuthService {
                    auth_repo: self.auth_repo.clone(),
                    pass_worker: PasswordWorker::new(10, 4).unwrap(),
                },
            })
    }
}
