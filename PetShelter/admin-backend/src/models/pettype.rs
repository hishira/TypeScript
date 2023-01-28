use crate::schema::{pettypes};
use rocket::serde::{ Deserialize, Serialize};

#[derive(Identifiable, Queryable, PartialEq, Debug, Serialize, Deserialize)]
#[table_name = "pettypes"]
pub struct PetType {
    pub id: i32,
    pub value: String,
    pub visible: bool
}