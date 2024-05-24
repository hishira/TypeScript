use axum::{
    extract::State,
    routing::{get, post},
    Error, Json, Router,
};
use sqlx::{Pool, Postgres};

use crate::{
    api::{
        appstate::appstate::AppState,
        dtos::userdto::userdto::{CreateUserDto, DeleteUserDto, UserDtos, UserFilterOption},
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
        T: Repository<User, UserFilterOption>,
    {
        let user_tmp =
            UserService::get_user_from_dto(UserDtos::Create(params), &state.pass_worker).await;
        let user = state.repo.create(user_tmp).await;
        Json(user)
    }

    async fn user_find<T>(
        claims: Claims,
        State(state): State<AppState<T>>,
        Json(params): Json<UserFilterOption>,
    ) -> Result<Json<Vec<User>>, AuthError>
    where
        T: Repository<User, UserFilterOption>,
    {
        match claims.role {
            Some(role) => {
                if !role.is_admin() {
                    return Err(AuthError::WrongCredentials);
                }
                let users = state.repo.find(params).await;
                Ok(Json(users))
            }
            None => Err(AuthError::MissingCredentials),
        }
    }

    async fn user_delete<T>(
        claims: Claims,
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<DeleteUserDto>,
    ) -> Json<User>
    where
        T: Repository<User, UserFilterOption>,
    {
        todo!() //let user = state.repo.delete(None);
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
            .route("/test-protected", post(pp))
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
    T: Repository<User, UserFilterOption>,
{
    print!("{}", params.email);
    Ok(format!("OK"))
}
