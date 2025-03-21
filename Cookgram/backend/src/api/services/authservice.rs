use crate::api::{
    dtos::{
        tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
        userdto::{
            authenticationuserdto::AuthenticationUserDto, credentialsdto::CredentialsFilterOption,
            operationuserdto::UserAuthDto,
        },
    },
    errors::{autherror::AuthError, responseerror::ResponseError},
    repositories::{authenticationrepository::AuthenticationRepository, repositories::Repository},
    router::authrouter::AuthDTO,
    services::tokenservice::TokenService,
    utils::{jwt::tokens::JwtTokens, password_worker::password_worker::PasswordWorker},
};
use axum::Json;

#[derive(Clone)]
pub struct AuthService {
    pub auth_repo: AuthenticationRepository,
    pub pass_worker: PasswordWorker,
}

impl AuthService {
    pub async fn get_refresh_token(
        &self,
        params: RefreshTokenDto,
    ) -> Result<Json<AccessTokenDto>, ResponseError> {
        TokenService::refresh_token(params).await
    }

    pub async fn generate_tokens_if_user_exists(
        &self,
        params: UserAuthDto,
    ) -> Result<Json<AuthDTO>, ResponseError> {
        let user = self
            .find_user_for_login(params.clone().username.unwrap())
            .await?;
        let (access_token, refresh_token) =
            TokenService::get_access_refresh_cliaims(&params, user.clone());
        let tokens = TokenService::generate_tokens(&access_token, &refresh_token)?;
        tracing::info!("Token for user {} generate", user.id.get_id());
        self.get_tokens_if_passwords_match(params.password, user.credentials.password, tokens)
            .await
            .map_err(|e| ResponseError::from(e))
    }

    async fn find_user_for_login(
        &self,
        username: String,
    ) -> Result<AuthenticationUserDto, AuthError> {
        let filter = CredentialsFilterOption::from_usernam(username);
        let users = self.auth_repo.find(filter).await;
        let users = match users {
            Ok(users) => users,
            Err(error) => {
                tracing::error!("Error occur, {}", error);
                Err(AuthError::UserNotExists)?
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
    ) -> Result<Json<AuthDTO>, AuthError> {
        let pass_worker = PasswordWorker::new(10, 4).unwrap();
        pass_worker
            .password_match(password, hashed_user_password)
            .await
            .map(|_| Json(TokenService::prepare_auth_from_token(tokens)))
    }
}
