use super::{
    consts::{JWT_EXPECT_MESSAGE, JWT_SECRET},
    jwt::Claims,
};
use crate::api::{errors::autherror::AuthError, utils::jwt::consts::ERROR_TOKEN_CREATION};
use jsonwebtoken::{
    decode, encode, errors::ErrorKind, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use once_cell::sync::Lazy;

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
            tracing::error!("{}, {}", ERROR_TOKEN_CREATION, e);
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
    let secret = dotenv::var(JWT_SECRET).expect(JWT_EXPECT_MESSAGE);
    Keys::new(secret.as_bytes())
});
