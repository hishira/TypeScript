use axum::{
    extract::State,
    routing::{delete, get, post},
    Error, Json, Router,
};
use mongodb::Database as MongoDatabase;
use sqlx::{Pool, Postgres};

use crate::{
    api::{
        appstate::appstate::AppState,
        dtos::{
            addressdto::createaddressdto::CreateAddressDto,
            userdto::userdto::{
                CreateUserDto, DeleteUserDto, UpdateUserDto, UserDtos, UserFilterOption,
            },
        },
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
        event::userevent::UserEvent,
        role::access::{Action, Queries, QueriesActions},
        state::{entitystate::EntityState, state::State as CoreState},
        user::{self, user::User},
    },
    database::init::Database,
};

use super::{authrouter::AuthError, router::ApplicationRouter};

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
            },
            event_repo: EventRepository {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                    .unwrap(),
                event_query: EventQuery {},
            },
        }
    }
    async fn user_create<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<CreateUserDto>,
    ) -> Json<User>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        let user_tmp =
            UserService::get_user_from_dto(UserDtos::Create(params), &state.pass_worker, None)
                .await;
        let user = state.repo.create(user_tmp).await;
        Json(user)
    }

    async fn create_managed_users<T>(
        claims: Claims,
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<CreateUserDto>,
    ) -> Result<Json<bool>, AuthError>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        ClaimsGuard::manage_user_guard(claims.clone())?;
        let user =
            UserService::get_user_from_dto(UserDtos::Create(params), &state.pass_worker, None)
                .await;
        let ids_touples = (claims.user_id.unwrap(), user.id);
        state.repo.create(user).await;
        let result = UserService::create_user_connection(ids_touples, state.event_repo.pool).await;
        match result {
            Ok(_) => Ok(Json(true)),
            Err(error) => {
                tracing::error!("User cannot be added {}", error);
                return Ok(Json(false));
            }
        }
    }

    async fn get_managed_users<T>(
        claims: Claims,
        State(state): State<AppState<T>>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, AuthError>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        ClaimsGuard::manage_user_guard(claims.clone())?;

        return Ok(Json(
            state
                .repo
                .find(UserFilterOption {
                    owner_id: claims.user_id,
                    ..params
                })
                .await
                .unwrap_or(vec![]),
        ));
    }

    async fn add_user_address<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<CreateAddressDto>,
    ) -> Json<String>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        let user = state.repo.find_by_id(params.user_id).await;
        state
            .repo
            .update(User::create_base_on_user_and_address(
                user,
                CreateAddressDto::build_address_based_on_create_dto(params),
            ))
            .await;
        Json("Ok".to_string())
    }

    async fn update_user<T>(
        claims: Claims,
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<UpdateUserDto>,
    ) -> Result<Json<User>, AuthError>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        ClaimsGuard::user_update_guard(claims.clone())?;
        let user = state.repo.find_by_id(claims.user_id.unwrap()).await;
        let updated_user = UserService::get_user_from_dto(
            UserDtos::Update(params),
            &state.pass_worker,
            Some(user),
        )
        .await;
        state.repo.update(updated_user.clone()).await;
        return Ok(Json(updated_user));
    }

    async fn user_find<T>(
        claims: Claims,
        State(state): State<AppState<T>>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, AuthError>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        ClaimsGuard::role_guard_user_find(claims)?;
        let users = state.repo.find(params).await.unwrap_or(vec![]);
        Ok(Json(users))
    }

    async fn user_delete<T>(
        claims: Claims,
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<DeleteUserDto>,
    ) -> Result<Json<User>, AuthError>
    where
        T: Repository<User, UserFilterOption, sqlx::Error>,
    {
        ClaimsGuard::user_delete_guard(claims)?;
        let mut user = state.repo.find_by_id(params.id).await;
        user.state.update(CoreState {
            current: EntityState::Deleted,
            previous: Some(user.state.previous.clone().unwrap_or(EntityState::Active)),
        });
        state.repo.delete(user.clone()).await;
        return Ok(Json(user));
    }
}

impl ApplicationRouter for UserRouter {
    fn get_router(&self) -> axum::Router {
        Router::new()
            .route(
                "/users",
                get(UserRouter::user_find).post(UserRouter::user_create),
            )
            .route("/protected", get(protected))
            .route("/update-user", post(UserRouter::update_user))
            .route("/delete-user", delete(UserRouter::user_delete))
            .route("/add-user", post(UserRouter::create_managed_users))
            .route("/get-managed-users", get(UserRouter::get_managed_users))
            .route("/test-protected", post(pp))
            .route("/address-create", post(UserRouter::add_user_address))
            .with_state(AppState {
                repo: self.user_repo.clone(),
                event_repo: self.event_repo.clone(),
                pass_worker: PasswordWorker::new(10, 4).unwrap(),
            })
    }
}

async fn protected(claims: Claims) -> Result<String, AuthError> {
    Ok(format!("{}", claims.user_id.unwrap()))
}
async fn pp<T>(
    claims: Claims,
    State(state): State<AppState<T>>,
    ValidateDtos(params): ValidateDtos<CreateUserDto>,
) -> Result<String, AuthError>
where
    T: Repository<User, UserFilterOption, sqlx::Error>,
{
    print!("{}", params.email);
    Ok(format!("OK"))
}
