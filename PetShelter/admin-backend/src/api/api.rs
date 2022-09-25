use self::diesel::prelude::*;
use crate::config::Db;
use crate::jwt::{ generate_token, UserJWTToken, JWTToken};
use crate::models::post::Post;
use crate::models::user::{User, UserAuthForm, UserPartial};
use crate::schema::posts;
use crate::schema::users;
use bcrypt::verify;
use rocket::http::Status;
use rocket::response::{status, status::Created};
use rocket::serde::json::Json;
use rocket_sync_db_pools::diesel;
use crate::models::result::Result;

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
    let _user_with_email = User::check_user_by_email(&db, user.email.clone()).await;
    //print("User {}")
    match _user_with_email {
        Ok(_checked_user) => Status::Locked,
        Err(e) => {
            User::create(&db, user).await
        }
    }
}

#[post("/login", data = "<userauthform>")]
pub async fn login(
    db: Db,
    userauthform: Json<UserAuthForm>,
    token: JWTToken,
) -> status::Custom<Json<Option<UserJWTToken>>> {
    let email = userauthform.email.clone();
    let usef_form_clone = userauthform.clone();
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
                    status::Custom(Status::Ok, Json(generate_token(usef_form_clone)))
                } else {
                    status::Custom(Status::Forbidden, Json(None))
                }
            } else {
                status::Custom(Status::Forbidden, Json(None))
            }
        }
        Err(e) => status::Custom(Status::NotFound, Json(None)),
    }
}
// #[post("/user", data="<user>")]
// async fn create_user(db: Db,user: Json<User>)-> Result<Created<Json<User>>>{

// }

#[get("/users")]
pub async fn user_lists(db: Db) -> Option<Json<Vec<UserPartial>>> {
    User::users_list(db).await
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
