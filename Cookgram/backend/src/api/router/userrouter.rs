use axum::{
    extract::{rejection::{FormRejection, JsonRejection}, Form, FromRequest, Request, State}, http::StatusCode, response::{Html, IntoResponse, Response}, routing::post, Json, Router
};
use async_trait::async_trait;
use thiserror::Error;
use serde::{de::DeserializeOwned, Deserialize};
use validator::Validate;

use crate::{
    api::{
        appstate::appstate::AppState,
        dtos::userdto::userdto::{CreateUserDto, UserDtos},
        queries::userquery::userquery::UserQuery,
        repositories::{
            repositories::Repository,
            userrepositories::{UserFilterOption, UserRepositories},
        },
    },
    core::user::user::User,
    database::init::Database,
};

use super::router::ApplicationRouter;

pub struct UserRouter {
    user_repo: UserRepositories,
}
trait RRouter: Send + Sync {}

impl UserRouter {
    pub fn new(database: Database) -> Self {
        Self {
            user_repo: UserRepositories {
                pool: database.pool.unwrap(),
                user_queries: UserQuery::new(None, None, None),
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
        println!("{}",params.email);
        let user = User::new(
            None,
            "test_usernam".to_string(),
            "test_usernam".to_string(),
            "test_usernam".to_string(),
            None,
        );
        state.repo.create(user.clone()).await;
        Json(user)
    }

    async fn validate_user() {}
}

impl ApplicationRouter for UserRouter {
    fn get_router(&self) -> axum::Router {
        Router::new()
            .route("/users", post(UserRouter::user_create))
            .with_state(AppState {
                repo: self.user_repo.clone(),
            })
    }
}

#[derive(Debug, Clone, Copy, Default, Deserialize)]
pub struct ValidateDtos<T>(pub T);

#[async_trait]
impl<T, S> FromRequest<S> for ValidateDtos<T>
where
    T: DeserializeOwned + Validate ,
    S: Send + Sync,
    Json<T>: FromRequest<S, Rejection = JsonRejection>,
{
    type Rejection = ServerError;

    async fn from_request(req: Request, state: &S) -> Result<Self, Self::Rejection>{
        let Json(value) = Json::<T>::from_request(req, state).await?;
        value.validate()?;
        Ok(ValidateDtos(value))
    }
}

#[derive(Debug, Error)]
pub enum ServerError {
    #[error(transparent)]
    ValidationError(#[from] validator::ValidationErrors),

    #[error(transparent)]
    AxumFormRejection(#[from] JsonRejection),
}

impl IntoResponse for ServerError {
    fn into_response(self) -> Response {
        match self {
            ServerError::ValidationError(_) => {
                let message = format!("Input validation error: [{self}]").replace('\n', ", ");
                (StatusCode::BAD_REQUEST, message)
            }
            ServerError::AxumFormRejection(_) => (StatusCode::BAD_REQUEST, self.to_string()),
        }
        .into_response()
    }
}
