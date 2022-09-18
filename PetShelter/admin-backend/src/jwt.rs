use chrono::Utc;
use jsonwebtoken::{ TokenData, Header, Validation,EncodingKey, DecodingKey};
use crate::models::user::{UserToken,UserAuthForm};
use rocket::serde::{json::Json};
use rocket::serde::{Deserialize, Serialize};
use jsonwebtoken::errors::Result;

const tokenTime: i64 = 60 * 3; // 3 minutes token
const refreshToken: i64 = 60 * 60; // one hour token

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct UserJWTToken {
    token: String,
    refreshToken: String,
}

pub fn generate_token(user_form: Json<UserAuthForm>) -> Option<UserJWTToken> {
    let now  = Utc::now().timestamp_nanos() / 1_000_000_000;
    let token_peyload = UserToken {
        iat: now,
        exp: now + tokenTime,
        user: user_form.email.to_owned(),
    };
    let refresh_token_peyload = UserToken {
        iat: now,
        exp: now + refreshToken,
        user: user_form.email.to_owned()
    };
    let token = UserJWTToken {
        token:     jsonwebtoken::encode(&Header::default(), &token_peyload, &EncodingKey::from_secret("secret".as_ref())).unwrap(),
        refreshToken:  jsonwebtoken::encode(&Header::default(), &refresh_token_peyload, &EncodingKey::from_secret("secret".as_ref())).unwrap()
    };
    Some(token)
}

pub fn decode_token(token: String) -> Result<TokenData<UserToken>> {
    jsonwebtoken::decode::<UserToken>(&token,  &DecodingKey::from_secret("secret".as_ref()), &Validation::default())
}