use diesel::prelude::*;
use rocket::{http::Status};
use rocket::serde::json::Json;
use rocket::serde::{ Deserialize, Serialize};
use crate::schema::{pets, users};
use crate::config::Db;

use super::user::User;
use super::pettype::PetType;
#[derive(Identifiable, Queryable, Associations, PartialEq, Debug, Serialize)]
#[belongs_to(User)]
#[belongs_to(PetType, foreign_key="pettype_id")]
#[table_name = "pets"]
pub struct Pet {
    pub id: i32,
    pub user_id: i32,
    pub pettype_id: i32,
    pub name: String,
}

#[derive(Deserialize)]
pub struct PetForm {
    pub name: String
}

#[derive(Debug, Insertable)]
#[table_name = "pets"]
pub struct InsertablePet {
    pub name: String,
    pub user_id: i32
}
impl Pet {
    pub async fn create(db: &Db, user_id: i32, pet: Json<PetForm>) -> Status{
        let pet_to_table = InsertablePet {
            user_id,
            name: pet.name.clone()
        };
        db.run(move |conn| {
            diesel::insert_into(pets::table)
            .values(&pet_to_table)
            .execute(conn)
        }).await;
        Status::Ok
    }

    pub async fn list(db: Db) -> Option<Json<Vec<Pet>>> {
        db.run(move |conn|{
            pets::table
                .select((pets::id, pets::user_id, pets::pettype_id, pets::name))
                .load::<Pet>(conn)
        })
        .await
        .map(Json)
        .ok()
    }

    pub async fn list_by_user(db: Db, user_id: i32) -> Option<Json<Vec<Pet>>> {
        let user = User::user_id(&db, user_id).await;
        match user {
            Ok(user) => {
                db.run(move |conn|{
                    Pet::belonging_to(&user)
                    .load::<Pet>(conn)
                })
                .await
                .map(Json)
                .ok()
             },
            Err(_) => todo!(),
        }
    }
}
