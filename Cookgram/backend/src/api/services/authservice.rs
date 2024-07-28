use axum::Json;

use crate::api::{
    dtos::tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
    errors::responseerror::ResponseError,
    repositories::userrepositories::UserRepositories,
    utils::jwt::jwt::Claims,
};

#[derive(Clone)]
pub struct AuthService {
    pub user_repo: UserRepositories,
}

impl AuthService {
    pub async fn refresh_token(
        &self,
        params: RefreshTokenDto,
    ) -> Result<Json<AccessTokenDto>, ResponseError> {
        Ok(Json(AccessTokenDto {
            access_token: Claims::refresh_token_expired_token(params.refresh_token)?,
        }))
    }
}
