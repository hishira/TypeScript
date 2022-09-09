use rocket::{Rocket, Build};
use rocket::fairing::AdHoc;
use rocket::response::{Debug, status::Created};
use rocket::serde::{Serialize, Deserialize, json::Json};


use rocket_sync_db_pools::diesel;
use self::diesel::prelude::*;

#[database("diesel")]
struct Db(diesel::SqliteConnection);

type Result<T, E = Debug<diesel::result::Error>> = std::result::Result<T,E>;

table! {
    posts (id) {
        id -> Nullable<Integer>,
        title -> Text,
        text -> Text,
        published -> Bool,
    }
}

table! {
    users (id) {
        id -> Nullable<Integer>,
        name -> Nullable<Text>,
        last_name -> Nullable<Text>,
        email -> Text,
        password -> Text,
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[table_name="posts"]
struct Post {
    #[serde(skip_deserializing)]
    id: Option<i32>,
    title: String,
    text: String,
    #[serde(skip_deserializing)]
    published: bool,
}


#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[table_name="users"]
struct User{
    #[serde(skip_deserializing)]
    id: Option<i32>,
    name: Option<String>,
    last_name: Option<String>,
    email: String,
    #[serde(skip_deserializing)]
    password: String,

}




#[post("/",data="<post>")]
async fn create(db: Db,post: Json<Post> ) -> Result<Created<Json<Post>>>{
    let post_vlue = post.clone();
    db.run(move |conn|{
        diesel::insert_into(posts::table)
            .values(&*post_vlue)
            .execute(conn)
    }).await?;

    Ok(Created::new("/").body(post))
}
// #[post("/user", data="<user>")]
// async fn create_user(db: Db,user: Json<User>)-> Result<Created<Json<User>>>{

// }

#[get("/users")]
async fn user_lists(db: Db) -> Result<Json<Vec<(Option<i32>,Option<String>,Option<String>,String)>>>{
    let all_users = db.run(move |conn|{
        users::table
            .select((users::id,users::name,users::last_name,users::email))
            .load::<(Option<i32>, Option<String>,Option<String>,String)>(conn)
    }).await?;
    
    Ok(Json(all_users))
}

#[get("/")]
async fn list(db: Db) -> Result<Json<Vec<Option<i32>>>>{
    let ids: Vec<Option<i32>> = db.run(move |conn|{
        posts::table
            .select(posts::id)
            .load(conn)
    }).await?;
    
    Ok(Json(ids))
}

#[get("/<id>")]
async fn read(db:Db, id: i32) -> Option<Json<Post>> {
    db.run(move |conn| {
        posts::table
            .filter(posts::id.eq(id))
            .first(conn)
    }).await.map(Json).ok()
}

async fn run_migrations(rocket: Rocket<Build>) -> Rocket<Build> {
    embed_migrations!("db/migrations");
    let conn = Db::get_one(&rocket).await.expect("database connection");
    conn.run(|c| embedded_migrations::run(c)).await.expect("diesel migrations");

    rocket
}

pub fn stage() -> AdHoc {
    AdHoc::on_ignite("Diesel SQLite Stage", |rocket| async {
        rocket.attach(Db::fairing())
            .attach(AdHoc::on_ignite("Diesel migrations", run_migrations))
            .mount("/diesel", routes![list, read, create, user_lists ])
    })
}