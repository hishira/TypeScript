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
        appstate::{appstate::AppState, authstate::AuthState}, daos::userdao::UserDAO, dtos::{
            tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
            userdto::userdto::{UserAuthDto, UserFilterOption, UserRegisterDto},
        }, errors::{autherror::AuthError, responseerror::ResponseError}, queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery}, repositories::{
            eventrepository::EventRepository, repositories::Repository,
            userrepositories::UserRepositories,
        }, services::authservice::AuthService, utils::{
            jwt::{
                jwt::Claims,
                keys::{Keys, KEYS},
            },
            password_worker::password_worker::PasswordWorker,
        }, validators::dtovalidator::ValidateDtos
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
    pub fn get_from_token(tokens: (String, String)) -> Self {
        Self {
            access_token: tokens.0.clone(),
            refresh_token: tokens.1.clone(),
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

    fn fill_user_into_tokens(tokens: (&mut Claims, &mut Claims), user: User) {
        tokens.0.user_id = Some(user.id.get_id());
        tokens.0.role = Some(user.role.clone());
        tokens.1.user_id = Some(user.id.get_id());
        tokens.1.role = Some(user.role.clone());
    }

    async fn login(
        State(state): State<AuthState>,
        ValidateDtos(params): ValidateDtos<UserAuthDto>,
    ) -> Result<Json<AuthBody>, AuthError> {
        let mut access_claims: Claims = Claims::new(&params, None);
        let mut refresh_claims: Claims = Claims::new(&params, Some(1000));
        let filter = UserFilterOption::from_claims(access_claims.clone());
        let users = state.app_state.repo.find(filter.clone()).await;
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
        Self::fill_user_into_tokens((&mut access_claims, &mut refresh_claims), user.clone());
        let access_token = Keys::encode(&access_claims)?;
        let refresh_token = Keys::encode(&refresh_claims)?;
        return AuthRouter::password_match(
            &state.pass_worker,
            params.password,
            user.credentials.password.clone(),
            (access_token, refresh_token),
        )
        .await;
    }

    async fn password_match(
        password_worker: &PasswordWorker,
        password: String,
        user_password: String,
        tokens: (String, String), //access_token, refresh_token
    ) -> Result<Json<AuthBody>, AuthError> {
        match password_worker.verify(password, user_password).await {
            Ok(verify_response) => {
                if verify_response {
                    return Ok(Json(AuthBody::get_from_token(tokens)));
                } else {
                    return Result::Err(AuthError::WrongCredentials);
                }
            }
            Err(_) => Result::Err(AuthError::BCryptError),
        }
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
                },
                pass_worker: PasswordWorker::new(10, 4).unwrap(),
            })
    }
}
