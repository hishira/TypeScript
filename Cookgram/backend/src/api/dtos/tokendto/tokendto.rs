use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Deserialize,Validate)]
#[serde(rename_all = "camelCase")]
pub struct RefreshTokenDto {
    pub refresh_token: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AccessTokenDto {
    pub access_token: String,
}
