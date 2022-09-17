use diesel::prelude::*;
use rocket::serde::{ Deserialize, Serialize};
use crate::schema::posts;
use crate::schema::posts::dsl::*;

#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[table_name = "posts"]
pub struct Post {
    #[serde(skip_deserializing)]
    id: Option<i32>,
    title: String,
    text: String,
    #[serde(skip_deserializing)]
    published: bool,
}