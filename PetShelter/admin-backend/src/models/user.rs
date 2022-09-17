use diesel::prelude::*;
use rocket::serde::{ Deserialize, Serialize};
use crate::schema::users;
#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[table_name = "users"]
pub struct User {
    #[serde(skip_deserializing)]
    id: Option<i32>,
    pub name: Option<String>,
    pub last_name: Option<String>,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[table_name = "users"]
pub struct UserPartial {
    id: Option<i32>,
    name: Option<String>,
    last_name: Option<String>,
    email: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
pub struct UserAuthForm {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]

pub struct UserToken {
    pub iat: i64,
    pub exp: i64,
    pub user: String,
}