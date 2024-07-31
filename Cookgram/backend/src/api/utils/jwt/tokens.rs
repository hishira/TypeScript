use crate::api::errors::autherror::AuthError;

use super::{jwt::Claims, keys::Keys};

pub struct AccessToken(pub String);
pub struct RefreshToken(pub String);
pub struct JwtTokens(pub AccessToken, pub RefreshToken);

impl JwtTokens {
    pub fn generete_from_claims(
        access_claims: &Claims,
        refresh_claims: &Claims,
    ) -> Result<Self, AuthError> {
        Ok(Self {
            0: AccessToken(Keys::encode(&access_claims)?),
            1: RefreshToken(Keys::encode(&refresh_claims)?),
        })
    }
}
