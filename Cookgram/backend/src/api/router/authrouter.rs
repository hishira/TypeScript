use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};
use jsonwebtoken::{decode, encode, errors::ErrorKind, DecodingKey, EncodingKey, Header, TokenData, Validation};
use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};
use sqlx::{Pool, Postgres};
use validator::Validate;

use crate::{
    api::{
        appstate::appstate::AppState,
        daos::userdao::UserDAO,
        dtos::userdto::userdto::{UserAuthDto, UserFilterOption, UserRegisterDto},
        errors::autherror::AuthError,
        queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery},
        repositories::{
            eventrepository::EventRepository, repositories::Repository,
            userrepositories::UserRepositories,
        },
        utils::{jwt::{jwt::Claims, keys::{Keys, KEYS}}, password_worker::password_worker::PasswordWorker},
        validators::dtovalidator::ValidateDtos,
    },
    core::user::user::User,
    database::init::Database,
};

use super::router::ApplicationRouter;


#[derive(Debug, Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthBody {
    access_token: String,
    refresh_token: String,
}

impl AuthBody {
    pub fn get_from_token(token: String) -> Self {
        Self {
            access_token: token.clone(),
            refresh_token: token.clone(),
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AccessToken {
    access_token: String,
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

    async fn refresh_token(claims: Claims) -> Result<Json<AccessToken>, AuthError> {
        let new_token = encode(&Header::default(), &claims, &KEYS.encoding).map_err(|e| {
            tracing::error!("Error occur while token refresh, {}", e);
            return AuthError::TokenCreation;
        })?;
        Ok(Json(AccessToken {
            access_token: new_token.clone(),
        }))
    }

    async fn login<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<UserAuthDto>,
    ) -> Result<Json<AuthBody>, AuthError>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        let mut claims: Claims = Claims::new(&params);
        let filter = UserFilterOption::from_claims(claims.clone());
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
        claims.user_id = Some(user.id);
        claims.role = Some(user.role.clone());
        let token = Keys::encode(&claims)?;
        return AuthRouter::password_match(
            &state.pass_worker,
            params.password,
            user.password.clone(),
            token,
        )
        .await;
    }

    async fn password_match(
        password_worker: &PasswordWorker,
        password: String,
        user_password: String,
        token: String,
    ) -> Result<Json<AuthBody>, AuthError> {
        match password_worker.verify(password, user_password).await {
            Ok(verify_response) => {
                if verify_response {
                    return Ok(Json(AuthBody::get_from_token(token)));
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
        Router::new()
            .route("/login", post(AuthRouter::login))
            .route("/refresh-token", get(AuthRouter::refresh_token))
            .with_state(AppState {
                repo: self.user_repo.clone(),
                event_repo: self.event_repo.clone(),
                pass_worker: PasswordWorker::new(10, 4).unwrap(),
            })
    }
}
