use bcrypt::{hash, DEFAULT_COST};
use diesel::prelude::*;
use diesel::result::Error;
use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::serde::{ Deserialize, Serialize};
use crate::schema::users;
use crate::models::result::Result;
use crate::config::Db;
use super::role::Role;
use super::meta::Meta;
#[derive(Debug, Clone, Deserialize, Serialize,Associations, Queryable, Insertable, Identifiable)]
#[serde(crate = "rocket::serde")]
#[belongs_to(Meta, foreign_key="meta_id")]
#[table_name = "users"]
pub struct User {
    #[serde(skip_deserializing)]
    pub id: i32,
    pub name: Option<String>,
    pub last_name: Option<String>,
    pub email: String,
    pub password: String,
    pub meta_id: i32,
    pub role: String,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable, Identifiable)]
#[serde(crate = "rocket::serde")]
#[table_name = "users"]
pub struct UserPartial {
    id: i32,
    name: Option<String>,
    last_name: Option<String>,
    email: String,
    role: String
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
pub struct UserAuthForm {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]

pub struct UserTokenInfo {
    pub id: i32,
    pub email: String,
    pub role: String,  
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]

pub struct UserToken {
    pub iat: i64,
    pub exp: i64,
    pub user: UserTokenInfo,
}

impl User{
    pub async fn create(db: &Db,user: Json<User>) -> Status {
        let hashes = hash(&user.password, DEFAULT_COST);
        match hashes {
            Ok(pass) => {
                let mut create_clone_user = user.clone();
                create_clone_user.password = pass;
                create_clone_user.role = Role::UserRole();
                create_clone_user.meta_id = 1;
                db.run(move |conn|{
                    diesel::insert_into(users::table)
                    .values(&*create_clone_user)
                    .execute(conn)
                }).await;
                Status::Ok
            }
            Err(e) => Status::NotAcceptable,
        }
    }

    pub async fn check_user_by_email(db: &Db, user_email: String) -> Result<User, Error>{
        db.run(move |conn|{
            users::table
                .filter(users::email.eq(&user_email))
                .first::<User>(conn)
        }).await
    }

    pub async fn users_list(db: Db) -> Option<Json<Vec<UserPartial>>>{
        db.run(move |conn|{
            users::table
                .select((users::id, users::name,users::last_name, users::email, users::role ))
                .load::<UserPartial>(conn)
        })
        .await
        .map(Json)
        .ok()
    }

    pub async fn user_by_id(db: Db, id: i32) -> Option<Json<UserPartial>> {
        db.run(move |conn| {
            users::table
                .filter(users::id.eq(id))
                .select((users::id, users::name,users::last_name, users::email, users::role ))
                .first(conn)
        })
        .await
        .map(Json)
        .ok()
    }

    pub async fn user_id(db: &Db, id: i32) -> Result<User, diesel::result::Error> {
        db.run(move |conn| {
            users::table
                .filter(users::id.eq(id))
                .first::<User>(conn)
        })
        .await
    }

}
