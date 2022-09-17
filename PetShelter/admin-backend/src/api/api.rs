use self::diesel::prelude::*;
use bcrypt::{hash, verify, DEFAULT_COST};
use rocket::http::Status;
use rocket::request::{self, FromRequest, Request};
use rocket::response::{status::Created, Debug};
use rocket::serde::{json::Json};
use rocket::outcome::Outcome;
use rocket_sync_db_pools::diesel;
use jsonwebtoken::{ TokenData, Header, Validation,EncodingKey, DecodingKey};
use chrono::Utc;
use crate::models::user::{User, UserPartial, UserAuthForm, UserToken};
use crate::models::post::{Post};
use crate::config::Db;
use crate::schema::posts;
use crate::schema::users;
type Result<T, E = Debug<diesel::result::Error>> = std::result::Result<T, E>;
const tokenTime: i64 = 60 * 3; // 3 minutes token
const refreshToken: i64 = 60 * 60; // one hour token



#[post("/", data = "<post>")]
pub async fn create(db: Db, post: Json<Post>) -> Result<Created<Json<Post>>> {
    let post_vlue = post.clone();
    db.run(move |conn| {
        diesel::insert_into(posts::table)
            .values(&*post_vlue)
            .execute(conn)
    })
    .await?;

    Ok(Created::new("/").body(post))
}

#[post("/user", data = "<user>")]
pub async fn create_user(db: Db, user: Json<User>) -> Status {
    let user_value = user.clone();
    let _user_with_email = db
        .run(move |conn| {
            users::table
                .filter(users::email.eq(&user_value.email))
                .first::<User>(conn)
        })
        .await;
    //print("User {}")
    match _user_with_email {
        Ok(_checked_user) => Status::Locked,
        Err(e) => {
            let hashed = hash(&user.password, DEFAULT_COST);
            match hashed {
                Ok(pass) => {
                    let mut create_clone = user.clone();
                    create_clone.password = pass;
                    db.run(move |conn| {
                        diesel::insert_into(users::table)
                            .values(&*create_clone)
                            .execute(conn)
                    })
                    .await;
                    Status::Ok
                }
                Err(e) => Status::NotAcceptable,
            }
        }
    }
}

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
            1 => Outcome::Success(JWTToken(token[0].to_string())),
            _ => Outcome::Failure((Status::BadRequest, ApiKeyError::Missing)),
        }
    }
}

pub fn generate_token(userForm: Json<UserAuthForm>) -> String {
    let now  = Utc::now().timestamp_nanos() / 1_000_000_000;
    let peyload = UserToken {
        iat: now,
        exp: now + tokenTime,
        user: userForm.email.to_owned(),
    };
    jsonwebtoken::encode(&Header::default(), &peyload, &EncodingKey::from_secret("secret".as_ref())).unwrap()
}
#[post("/login", data = "<userauthform>")]
pub async fn login(db: Db, userauthform: Json<UserAuthForm>, token: JWTToken) -> (Status,String) {
    let email = userauthform.email.clone();
    let usefFormClone = userauthform.clone();
    let _user = db
        .run(move |conn| {
            users::table
                .filter(users::email.eq(email))
                .first::<User>(conn)
        })
        .await;
    match _user {
        Ok(user) => {
            println!("User password, {}", user.password);
            if let Ok(value) = verify(&userauthform.password, &user.password) {
                if value {
                    (Status::Ok, generate_token(usefFormClone))
                } else {
                    (Status::Forbidden, String::from("Password not match"))
                }
            } else {
                (Status::Forbidden, String::from("Error with login"))
            }
        }
        Err(e) => (Status::NotFound, String::from("User with that email not found")),
    }
}
// #[post("/user", data="<user>")]
// async fn create_user(db: Db,user: Json<User>)-> Result<Created<Json<User>>>{

// }

#[get("/users")]
pub async fn user_lists(db: Db) -> Option<Json<Vec<UserPartial>>> {
    db.run(move |conn| {
        users::table
            .select((users::id, users::name, users::last_name, users::email))
            .load::<UserPartial>(conn)
    })
    .await
    .map(Json)
    .ok()
}

#[get("/")]
pub async fn list(db: Db) -> Result<Json<Vec<Option<i32>>>> {
    let ids: Vec<Option<i32>> = db
        .run(move |conn| posts::table.select(posts::id).load(conn))
        .await?;

    Ok(Json(ids))
}

#[get("/<id>")]
pub async fn read(db: Db, id: i32) -> Option<Json<Post>> {
    db.run(move |conn| posts::table.filter(posts::id.eq(id)).first(conn))
        .await
        .map(Json)
        .ok()
}


