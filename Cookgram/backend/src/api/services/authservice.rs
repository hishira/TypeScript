use axum::Json;
use uuid::Uuid;

use crate::{
    api::{
        dtos::{
            tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
            userdto::userdto::{UserAuthDto, UserFilterOption},
        },
        errors::{autherror::AuthError, responseerror::ResponseError},
        repositories::{repositories::Repository, userrepositories::UserRepositories},
        router::authrouter::AuthBody,
        utils::{
            jwt::{jwt::Claims, tokens::JwtTokens},
            password_worker::password_worker::PasswordWorker,
        },
    },
    core::user::user::User,
};

#[derive(Clone)]
pub struct AuthService {
    pub user_repo: UserRepositories,
    pub pass_worker: PasswordWorker,
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

    pub async fn generate_tokens_if_user_exists(
        &self,
        params: UserAuthDto,
    ) -> Result<Json<AuthBody>, ResponseError> {
        let user = self
            .find_user_for_login(params.clone().username.unwrap())
            .await?;
        let access_refresh_cliaims = Self::get_access_refresh_cliaims(&params, user.id.get_id());
        let tokens = Self::generate_tokens(&access_refresh_cliaims.0, &access_refresh_cliaims.1)?;
        //TODO: If error is NOT_FOUND return user not found like somethind
        self.get_tokens_if_passwords_match(params.password, user.credentials.password, tokens)
            .await
            .map_err(|e| ResponseError::from(e))
    }

    async fn find_user_for_login(&self, username: String) -> Result<User, AuthError> {
        let filter = UserFilterOption::from_only_usernamr(username);
        let users = self.user_repo.find(filter.clone()).await;
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
        let user = users.get(0).unwrap().to_owned();
        Ok(user)
    }

    async fn get_tokens_if_passwords_match(
        &self,
        password: String,
        hashed_user_password: String,
        tokens: JwtTokens,
    ) -> Result<Json<AuthBody>, AuthError> {
        self.pass_worker
            .password_match(password, hashed_user_password)
            .await
            .map(|_| Json(AuthBody::get_from_token(tokens)))
    }

    fn generate_tokens(
        access_claims: &Claims,
        refresh_claims: &Claims,
    ) -> Result<JwtTokens, AuthError> {
        JwtTokens::generete_from_claims(&access_claims, &refresh_claims)
    }
    fn get_access_refresh_cliaims(params: &UserAuthDto, user_id: Uuid) -> (Claims, Claims) {
        (
            Claims::new(&params, None, user_id),
            Claims::new(&params, Some(1000), user_id),
        )
    }
}
