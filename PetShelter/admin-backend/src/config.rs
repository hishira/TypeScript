use rocket::fairing::AdHoc;
use rocket::{Build, Rocket};
use crate::api::api::{ user_lists, create_user, login, user_by_id, exampleCheck};
#[database("diesel")]
pub struct Db(diesel::SqliteConnection);

async fn run_migrations(rocket: Rocket<Build>) -> Rocket<Build> {
    embed_migrations!("db/migrations");
    let conn = Db::get_one(&rocket).await.expect("database connection");
    conn.run(|c| embedded_migrations::run(c))
        .await
        .expect("diesel migrations");

    rocket
}

pub fn stage() -> AdHoc {
    AdHoc::on_ignite("Diesel SQLite Stage", |rocket| async {
        rocket
            .attach(Db::fairing())
            .attach(AdHoc::on_ignite("Diesel migrations", run_migrations))
            .mount(
                "/diesel",
                routes![user_lists, create_user, login, user_by_id, exampleCheck],
            )
    })
}