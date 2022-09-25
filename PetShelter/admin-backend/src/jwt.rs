use chrono::Utc;
use jsonwebtoken::{ TokenData, Header, Validation,EncodingKey, DecodingKey};
use rocket::Response;
use rocket::request::{self, FromRequest, Request};
use rocket::response::status;
use crate::models::user::{UserToken,UserAuthForm, UserTokenInfo, User};
use rocket::serde::{json::Json};
use rocket::serde::{Deserialize, Serialize, json};
use jsonwebtoken::errors::Result;
use rocket::outcome::Outcome;
use rocket::http::Status;
use rocket::serde::json::Value;
const tokenTime: i64 = 60 * 60 * 3; // 3 minutes token
const refreshToken: i64 = 60 * 60; // one hour token

#[rocket::async_trait]
impl<'r> FromRequest<'r> for UserToken {
    type Error = status::Custom<Json<Value>>;

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self,status::Custom<Json<Value>>> {
        let token: Vec<_> = request.headers().get("Authorization").collect();
        match token.len() {
            0 =>Outcome::Failure(
                (
                    Status::BadRequest,
                    status::Custom(
                        Status::Unauthorized,
                        Json(json::Value::Null),
                    ),
                )
            ),
            1 => {
                let auth_string = token[0].to_string();
                if auth_string.starts_with("Bearer") {
                    let user_token = auth_string[6..token[0].to_string().len()].trim();
                    if let Ok(token_data) = decode_token(user_token.to_string()) {
                        return  Outcome::Success(token_data.claims);
                    }
                }
                Outcome::Failure(
                    (
                        Status::BadRequest,
                        status::Custom(
                            Status::Unauthorized,
                            Json(json::Value::Null),
                        ),
                    )
                )
            }
            _ => Outcome::Failure(
                (
                    Status::BadRequest,
                    status::Custom(
                        Status::Unauthorized,
                        Json(json::Value::Null),
                    ),
                )
            ),
        }
    }
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct UserJWTToken {
    token: String,
    refreshToken: String,
}

pub fn generate_token(user_form: User) -> Option<UserJWTToken> {
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