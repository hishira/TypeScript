use axum::{
    extract::{Path, State},
    routing::{delete, get, post},
    Json, Router,
};
use sqlx::{Pool, Postgres};
use uuid::Uuid;

use crate::{
    api::{
        appstate::{appstate::AppState, userstate::UserState},
        daos::userdao::UserDAO,
        dtos::{
            addressdto::createaddressdto::CreateAddressDto,
            userdto::{
                userdto::{
                    CreateUserDto, DeleteUserDto, UpdateUserDto, UserDtos, UserFilterOption,
                },
                userlistdto::UserListDto,
            },
        },
        errors::{autherror::AuthError, responseerror::ResponseError},
        guards::claimsguard::ClaimsGuard,
        queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery},
        repositories::{
            eventrepository::EventRepository, repositories::Repository,
            userrepositories::UserRepositories,
        },
        services::userservice::UserService,
        utils::{
            jwt::jwt::Claims, password_worker::password_worker::PasswordWorker,
            user::user_utils::UserUtils,
        },
        validators::dtovalidator::ValidateDtos,
    },
    core::{
        state::{entitystate::EntityState, state::State as CoreState},
        user::user::User,
    },
    database::{init::Database, redis::redisdatabase::RedisDatabase},
};

use super::router::ApplicationRouter;

pub struct UserRouter {
    user_repo: UserRepositories,
    event_repo: EventRepository,
    redis: RedisDatabase,
}

impl UserRouter {
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
    async fn user_create(
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<CreateUserDto>,
    ) -> Result<Json<User>, ResponseError> {
        state.user_service.create_user(params).await
    }

    async fn create_managed_users(
        claims: Claims,
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<CreateUserDto>,
    ) -> Result<Json<bool>, ResponseError> {
        ClaimsGuard::manage_user_guard(claims.clone())?;
        state
            .user_service
            .create_managed_user(params, claims.user_id.unwrap())
            .await
    }

    async fn user_details(
        Path(id): Path<Uuid>,
        claims: Claims,
        State(state): State<UserState>,
    ) -> Result<Json<User>, ResponseError> {
        ClaimsGuard::manage_user_guard(claims.clone())?;
        Result::Ok(Json(state.app_state.repo.find_by_id(id).await))
    }
    async fn get_managed_users(
        claims: Claims,
        State(state): State<UserState>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, ResponseError> {
        ClaimsGuard::manage_user_guard(claims.clone())?;

        Ok(Json(
            state
                .user_service
                .get_managed_users(UserFilterOption {
                    owner_id: claims.user_id,
                    ..params
                })
                .await,
        ))
    }

    async fn get_current_user(
        claims: Claims,
        State(state): State<UserState>,
    ) -> Result<Json<User>, ResponseError> {
        ClaimsGuard::current_user_guard(&claims)?;

        Ok(Json(
            state
                .user_service
                .get_current_user(claims.user_id.unwrap())
                .await,
        ))
    }

    async fn add_user_address(
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<CreateAddressDto>,
    ) -> Json<String> {
        state.user_service.add_user_address(params).await;
        Json("Ok".to_string())
    }

    async fn update_user(
        claims: Claims,
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<UpdateUserDto>,
    ) -> Result<Json<User>, ResponseError> {
        ClaimsGuard::user_update_guard(claims.clone())?;
        return Ok(Json(
            state
                .user_service
                .update_user(params, claims.user_id.unwrap())
                .await,
        ));
    }

    async fn user_find(
        claims: Claims,
        State(state): State<UserState>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, ResponseError> {
        ClaimsGuard::role_guard_user_find(claims)?;
        let users = state.app_state.repo.find(params).await.unwrap_or(vec![]);
        Ok(Json(users))
    }

    async fn user_list(
        claims: Claims,
        State(state): State<UserState>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<UserListDto>>, ResponseError> {
        ClaimsGuard::role_guard_user_find(claims.clone()).map_err(ResponseError::AuthError)?;
        let is_admin = claims
            .role
            .ok_or(AuthError::MissingCredentials)
            .map_err(|e| ResponseError::AuthError(e))?
            .is_administration_role();
        let params = Some(params)
            .map(|params| {
                let owner_id = (!is_admin)
                    .then(|| claims.user_id.ok_or(AuthError::MissingCredentials).unwrap());
                UserFilterOption {
                    limit: params.limit,
                    offset: params.offset,
                    username: params.username,
                    owner_id,
                    with_admin: Some(false),
                }
            })
            .unwrap();
        state
            .user_service
            .get_users(params)
            .await
            .map(Json)
            .map_err(|e| {
                tracing::error!("Error occur {}", e);
                e.into()
            })
    }
    async fn user_delete(
        claims: Claims,
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<DeleteUserDto>,
    ) -> Result<Json<User>, ResponseError> {
        ClaimsGuard::user_delete_guard(claims)?;
        let mut user = state.app_state.repo.find_by_id(params.id).await;
        user.state.update(CoreState {
            current: EntityState::Deleted,
            previous: Some(user.state.previous.clone().unwrap_or(EntityState::Active)),
        });
        state.app_state.repo.delete(user.clone()).await;
        return Ok(Json(user));
    }
}

impl ApplicationRouter for UserRouter {
    fn get_router(&self) -> axum::Router {
        let app_state: AppState<UserRepositories> = AppState {
            repo: self.user_repo.clone(),
            event_repo: self.event_repo.clone(),
            redis_database: self.redis.clone(),
        };
        let user_state: UserState = UserState {
            app_state,
            user_service: UserService::new(self.user_repo.user_dao.clone(), self.user_repo.clone()),
        };
        Router::new()
            .route(
                "/users",
                get(UserRouter::user_find).post(UserRouter::user_create),
            )
            .route("/protected", get(protected))
            .route("/update-user", post(UserRouter::update_user))
            .route("/user/:id", get(UserRouter::user_details))
            .route("/delete-user", delete(UserRouter::user_delete))
            .route("/add-user", post(UserRouter::create_managed_users))
            .route("/current-user", get(UserRouter::get_current_user))
            .route("/get-managed-users", get(UserRouter::get_managed_users))
            .route("/test-protected", post(pp))
            .route("/address-create", post(UserRouter::add_user_address))
            .route("/user-list", post(UserRouter::user_list))
            .with_state(user_state)
    }
}

async fn protected(claims: Claims) -> Result<String, AuthError> {
    Ok(format!("{}", claims.user_id.unwrap()))
}
async fn pp(
    claims: Claims,
    State(state): State<UserState>,
    ValidateDtos(params): ValidateDtos<CreateUserDto>,
) -> Result<String, AuthError> {
    print!("{}", params.email);
    Ok(format!("OK"))
}
