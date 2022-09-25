use chrono::Utc;
use jsonwebtoken::{ TokenData, Header, Validation,EncodingKey, DecodingKey};
use rocket::request::{self, FromRequest, Request};
use crate::models::user::{UserToken,UserAuthForm, UserTokenInfo};
use rocket::serde::{json::Json};
use rocket::serde::{Deserialize, Serialize};
use jsonwebtoken::errors::Result;
use rocket::outcome::Outcome;
use rocket::http::Status;

const tokenTime: i64 = 60 * 3; // 3 minutes token
const refreshToken: i64 = 60 * 60; // one hour token

pub struct JWTToken(String);
#[derive(Debug)]
pub enum ApiKeyError {
    BadCount,
    Missing,
}
#[rocket::async_trait]
impl<'r> FromRequest<'r> for JWTToken {
    type Error = ApiKeyError;

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        let token: Vec<_> = request.headers().get("Authorization").collect();
        match token.len() {
            0 => Outcome::Failure((Status::BadRequest, ApiKeyError::BadCount)),
            1 => {
                let auth_string = token[0].to_string();
                if auth_string.starts_with("Bearer") {
                    let user_token = auth_string[6..token[0].to_string().len()].trim();
                    if let Ok(token_data) = decode_token(user_token.to_string()) {
                        println!("{}", token_data.claims.user.email);
                    }
                }
                Outcome::Success(JWTToken(token[0].to_string()))
            }
            _ => Outcome::Failure((Status::BadRequest, ApiKeyError::Missing)),
        }
    }
}

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
        user: UserTokenInfo { id: (user_form.id), email: (user_form.email.clone()), role: (user_form.role.clone()) },
    };
    let refresh_token_peyload = UserToken {
        iat: now,
        exp: now + refreshToken,
        user: UserTokenInfo { id: (user_form.id), email: (user_form.email.clone()), role: (user_form.email.clone()) },
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