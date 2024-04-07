use axum::{extract::State, Json};
use serde::Deserialize;

use crate::api::{
    appstate::appstate::AppState, dtos::userdto::userdto::UserAuthDto,
    repositories::userrepositories::UserRepositories, utils::jwt::jwt::Claims,
    validators::dtovalidator::ValidateDtos,
};

#[derive(Debug, Deserialize)]
pub struct AuthBody {
    access_token: String,
    refresh_token: String,
}

#[derive(Debug)]
enum AuthError {
    WrongCredentials,
    MissingCredentials,
    TokenCreation,
    InvalidToken,
}
pub struct AuthRouter {
    user_repo: UserRepositories,
}

impl AuthRouter {
    async fn login<T>(
        State(state): State<AppState<T>>,
        ValidateDtos(params): ValidateDtos<UserAuthDto>,
    ) -> Result<Json<AuthBody>, AuthError> {
        let claims: Claims = match (params.email, params.username) {
            (None, None) => Claims {
                user_id: None,
                user_info: "TEst".to_string(),
            },
            (None, Some(username)) => Claims {
                user_id: None,
                user_info: username,
            },
            (Some(email), None) => Claims {
                user_id: None,
                user_info: email,
            },
            (Some(email), Some(password)) => Claims {
                user_id: None,
                user_info: email,
            },
        };
        Ok(Json(AuthBody {
            access_token: "asd".to_string(),
            refresh_token: "".to_string(),
        }))
    }
}
