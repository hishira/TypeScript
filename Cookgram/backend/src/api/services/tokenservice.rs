use crate::api::{
    dtos::{
        tokendto::tokendto::{AccessTokenDto, RefreshTokenDto},
        userdto::{authenticationuserdto::AuthenticationUserDto, operationuserdto::UserAuthDto},
    },
    errors::{autherror::AuthError, responseerror::ResponseError},
    router::authrouter::AuthDTO,
    utils::jwt::{jwt::Claims, tokens::JwtTokens},
};
use axum::Json;
use jsonwebtoken::get_current_timestamp;

pub struct TokenService {}

impl TokenService {
    pub fn generate_tokens(
        access_claims: &Claims,
        refresh_claims: &Claims,
    ) -> Result<JwtTokens, AuthError> {
        JwtTokens::generete_from_claims(&access_claims, &refresh_claims)
    }

    pub fn get_access_refresh_cliaims(
        params: &UserAuthDto,
        user: AuthenticationUserDto,
    ) -> (Claims, Claims) {
        let time_stamp = get_current_timestamp();
        (
            Claims::access_token(&params, user.clone(), time_stamp + 10000), //TODO only for test
            Claims::refresh_token(&params, user.clone(), 10000 + time_stamp),
        )
    }
    pub async fn refresh_token(
        params: RefreshTokenDto,
    ) -> Result<Json<AccessTokenDto>, ResponseError> {
        Ok(Json(AccessTokenDto {
            access_token: Claims::refresh_token_expired_token(params.refresh_token)?,
        }))
    }

    pub fn prepare_auth_from_token(tokens: JwtTokens) -> AuthDTO {
        AuthDTO {
            access_token: tokens.0 .0.clone(),
            refresh_token: tokens.1 .0.clone(),
        }
    }
}
