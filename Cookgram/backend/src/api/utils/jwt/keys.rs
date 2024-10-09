use jsonwebtoken::{
    decode, encode, errors::ErrorKind, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use once_cell::sync::Lazy;

use crate::api::errors::autherror::AuthError;

use super::jwt::Claims;

pub struct Keys {
    pub encoding: EncodingKey,
    pub decoding: DecodingKey,
}

impl Keys {
    fn new(secret: &[u8]) -> Self {
        Self {
            encoding: EncodingKey::from_secret(secret),
            decoding: DecodingKey::from_secret(secret),
        }
    }

    pub fn encode(claims: &Claims) -> Result<String, AuthError> {
        encode(&Header::default(), &claims, &KEYS.encoding).map_err(|e| {
            tracing::error!("Error occur while token creation, {}", e);
            return AuthError::TokenCreation;
        })
    }

    pub fn decode(token: &str, validation: Validation) -> Result<TokenData<Claims>, AuthError> {
        decode::<Claims>(token, &KEYS.decoding, &validation).map_err(|error| match *error.kind() {
            ErrorKind::ExpiredSignature => AuthError::TokenExpire,
            _ => AuthError::InvalidToken,
        })
    }
}
pub static KEYS: Lazy<Keys> = Lazy::new(|| {
    let secret = dotenv::var("JWT_SECRET").expect("JWT_SECRET must be set");
    Keys::new(secret.as_bytes())
});
