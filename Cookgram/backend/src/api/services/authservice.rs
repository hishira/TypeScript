use axum::Json;
use jsonwebtoken::get_current_timestamp;
use uuid::Uuid;

use crate::{
    api::{
        dtos::{
            tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
            userdto::{operationuserdto::UserAuthDto, userdto::UserFilterOption},
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
        let (access_token, refresh_token) = Self::get_access_refresh_cliaims(&params, user.clone());
        println!("{}, {}", access_token.exp, refresh_token.exp);
        let tokens = Self::generate_tokens(&access_token, &refresh_token)?;
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
        let pass_worker = PasswordWorker::new(10, 4).unwrap();
        pass_worker
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

    fn get_access_refresh_cliaims(params: &UserAuthDto, user: User) -> (Claims, Claims) {
        let time_stamp = get_current_timestamp();
        (
            Claims::access_token(&params, user.clone(), time_stamp), //laims::new(get_current_timestamp(), &params, None, user.clone()),
            Claims::refresh_token(&params, user.clone(), 10000 + time_stamp),
        )
    }
}
