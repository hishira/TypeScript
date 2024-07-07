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
            userdto::userdto::{
                CreateUserDto, DeleteUserDto, UpdateUserDto, UserDtos, UserFilterOption,
            },
        },
        errors::autherror::AuthError,
        guards::claimsguard::ClaimsGuard,
        queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery},
        repositories::{
            eventrepository::EventRepository, repositories::Repository,
            userrepositories::UserRepositories,
        },
        services::userservice::UserService,
        utils::{jwt::jwt::Claims, password_worker::password_worker::PasswordWorker},
        validators::dtovalidator::ValidateDtos,
    },
    core::{
        state::{entitystate::EntityState, state::State as CoreState},
        user::user::User,
    },
    database::init::Database,
};

use super::router::ApplicationRouter;

pub struct UserRouter {
    user_repo: UserRepositories,
    event_repo: EventRepository,
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
        }
    }
    async fn user_create(
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<CreateUserDto>,
    ) -> Json<User> {
        let user_tmp = UserService::get_user_from_dto(
            UserDtos::Create(params),
            &state.app_state.pass_worker,
            None,
        )
        .await;
        let user = state.app_state.repo.create(user_tmp).await;
        Json(user)
    }

    async fn create_managed_users(
        claims: Claims,
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<CreateUserDto>,
    ) -> Result<Json<bool>, AuthError> {
        ClaimsGuard::manage_user_guard(claims.clone())?;
        let user = UserService::get_user_from_dto(
            UserDtos::Create(params),
            &state.app_state.pass_worker,
            None,
        )
        .await;
        let ids_touples = (claims.user_id.unwrap(), user.id);
        state.app_state.repo.create(user).await;
        let result =
            UserService::create_user_connection(ids_touples, state.app_state.event_repo.pool).await;
        match result {
            Ok(_) => Ok(Json(true)),
            Err(error) => {
                tracing::error!("User cannot be added {}", error);
                return Ok(Json(false));
            }
        }
    }

    async fn user_details(
        Path(id): Path<Uuid>,
        claims: Claims,
        State(state): State<UserState>,
    ) -> Result<Json<User>, AuthError> {
        Result::Ok(Json(state.app_state.repo.find_by_id(id).await))
    }
    async fn get_managed_users(
        claims: Claims,
        State(state): State<UserState>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, AuthError> {
        ClaimsGuard::manage_user_guard(claims.clone())?;

        return Ok(Json(
            state
                .app_state
                .repo
                .find(UserFilterOption {
                    owner_id: claims.user_id,
                    ..params
                })
                .await
                .unwrap_or(vec![]),
        ));
    }

    async fn get_current_user(
        claims: Claims,
        State(state): State<UserState>,
    ) -> Result<Json<User>, AuthError> {
        ClaimsGuard::current_user_guard(&claims)?;
        let user = state
            .app_state
            .repo
            .find_by_id(claims.user_id.unwrap())
            .await;
        Ok(Json(user))
    }
    async fn add_user_address(
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<CreateAddressDto>,
    ) -> Json<String> {
        let user = state.app_state.repo.find_by_id(params.user_id).await;
        state
            .app_state
            .repo
            .update(User::create_base_on_user_and_address(
                user,
                CreateAddressDto::build_address_based_on_create_dto(params),
            ))
            .await;
        Json("Ok".to_string())
    }

    async fn update_user(
        claims: Claims,
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<UpdateUserDto>,
    ) -> Result<Json<User>, AuthError> {
        ClaimsGuard::user_update_guard(claims.clone())?;
        let user = state
            .app_state
            .repo
            .find_by_id(claims.user_id.unwrap())
            .await;
        let updated_user = UserService::get_user_from_dto(
            UserDtos::Update(params),
            &state.app_state.pass_worker,
            Some(user),
        )
        .await;
        state.app_state.repo.update(updated_user.clone()).await;
        return Ok(Json(updated_user));
    }

    async fn user_find(
        claims: Claims,
        State(state): State<UserState>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, AuthError> {
        ClaimsGuard::role_guard_user_find(claims)?;
        let users = state.app_state.repo.find(params).await.unwrap_or(vec![]);
        Ok(Json(users))
    }

    async fn user_list(
        claims: Claims,
        State(state): State<UserState>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, AuthError> {
        ClaimsGuard::role_guard_user_find(claims.clone())?;
        let is_admin = claims
            .role
            .ok_or(AuthError::MissingCredentials)?
            .is_administration_role();
        state
            .app_state
            .repo
            .find(
                Some(params)
                    .map(|params| {
                        let owner_id = (!is_admin)
                            .then(|| claims.user_id.ok_or(AuthError::MissingCredentials).unwrap());
                        UserFilterOption {
                            limit: params.limit,
                            offset: params.offset,
                            username: params.username,
                            owner_id,
                        }
                    })
                    .unwrap(),
            )
            .await
            .map(|e| Json(e))
            .map_err(|e| {
                tracing::error!("Error occur {}", e);
                return AuthError::UserNotExists;
            })
    }
    async fn user_delete(
        claims: Claims,
        State(state): State<UserState>,
        ValidateDtos(params): ValidateDtos<DeleteUserDto>,
    ) -> Result<Json<User>, AuthError> {
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
            pass_worker: PasswordWorker::new(10, 4).unwrap(),
        };
        let user_state: UserState = UserState {
            app_state,
            user_service: UserService::new(self.user_repo.user_dao.clone()),
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
) -> Result<String, AuthError>
{
    print!("{}", params.email);
    Ok(format!("OK"))
}
