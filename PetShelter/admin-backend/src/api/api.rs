use self::diesel::prelude::*;
use crate::config::Db;
use crate::jwt::{ generate_token, UserJWTToken};
use crate::models::user::{User, UserAuthForm, UserPartial, UserToken};
use crate::schema::users;
use crate::utils::status::{ResponseStatus};
use bcrypt::verify;
use rocket::Response;
use rocket::http::Status;
use rocket::response::{status};
use rocket::serde::json::Json;
use rocket_sync_db_pools::diesel;



#[post("/user", data = "<user>")]
pub async fn create_user(db: Db, user: Json<User>) -> Status {
    let _user_with_email = User::check_user_by_email(&db, user.email.clone()).await;
    //print("User {}")
    match _user_with_email {
        Ok(_checked_user) => Status::Locked,
        Err(e) => {
            User::create(&db, user).await
        }
    }
}

#[get("/tokenexample")]
pub async fn exampleCheck(token: UserToken) -> Status {
    print!("Email: {}, id: {}, role: {}",token.user.email,token.user.id,token.user.role);
    Status::Ok
}

#[post("/login", data = "<userauthform>")]
pub async fn login(
    db: Db,
    userauthform: Json<UserAuthForm>,
) -> status::Custom<Json<Option<UserJWTToken>>> {
    let email = userauthform.email.clone();
    let _user = db
        .run(move |conn| {
            users::table
                .filter(users::email.eq(email))
                .first::<User>(conn)
        })
        .await;
    match _user {
        Ok(user) => {
            if let Ok(value) = verify(&userauthform.password, &user.password) {
                if value {
                    ResponseStatus::Ok(generate_token(user))
                } else {
                    ResponseStatus::Forbidder_Empty_Json()
                }
            } else {
                ResponseStatus::Forbidder_Empty_Json()
            }
        }
        Err(e) => ResponseStatus::Not_Found(),
    }
}


#[get("/users")]
pub async fn user_lists(db: Db) -> Option<Json<Vec<UserPartial>>> {
    User::users_list(db).await
}

#[get("/user/<id>")]
pub async fn user_by_id(db: Db, id: i32) ->Option<Json<UserPartial>> {
    User::user_by_id(db, id).await
}

