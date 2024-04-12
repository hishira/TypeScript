use axum::{
    extract::State,
    routing::{get},
    Json, Router,
};
use sqlx::{Pool, Postgres};

use crate::{
    api::{
        appstate::appstate::AppState,
        dtos::userdto::userdto::{CreateUserDto, UserDtos, UserFilterOption},
        queries::{eventquery::eventquery::EventQuery, userquery::userquery::UserQuery},
        repositories::{eventrepository::EventRepository, repositories::Repository, userrepositories::UserRepositories},
        services::userservice::UserService,
        validators::dtovalidator::ValidateDtos,
    },
    core::{event::userevent::UserEvent, user::user::User},
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
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool).unwrap(),
                user_queries: UserQuery::new(None, None, None),
            },
            event_repo: EventRepository {
                pool: <std::option::Option<Pool<Postgres>> as Clone>::clone(&database.pool)
                    .unwrap(),
                event_query: EventQuery{}
            }
        }
    }
    async fn user_create<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<CreateUserDto>,
    ) -> Json<User>
    where
        T: Repository<User, UserFilterOption>,
    {
        let user = state
            .repo
            .create(UserService::get_user_from_dto(UserDtos::Create(params)))
            .await;
        let t = state.event_repo.create_later(UserEvent::create_event(user.id.clone()));
        Json(user)
    }

    async fn user_find<T>(
        State(state): State<AppState<T>>,
        Json(params): Json<UserFilterOption>,
    ) -> Json<Vec<User>>
    where
        T: Repository<User, UserFilterOption>,
    {
        let users = state.repo.find(params).await;
        Json(users)
    }
}

impl ApplicationRouter for UserRouter {
    fn get_router(&self) -> axum::Router {
        Router::new()
            .route(
                "/users",
                get(UserRouter::user_find).post(UserRouter::user_create),
            )
            .with_state(AppState {
                repo: self.user_repo.clone(),
                event_repo: self.event_repo.clone()
            })
    }
}
