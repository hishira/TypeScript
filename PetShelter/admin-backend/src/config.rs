use rocket::fairing::AdHoc;
use rocket::{Build, Rocket};
use rocket_sync_db_pools::{database, diesel};
use crate::api::api::{ user_lists, create_user, login, user_by_id, exampleCheck, create_pet, pet_list, pets_by_user};
#[database("diesel")]
pub struct Db(diesel::SqliteConnection);


async fn run_migrations(rocket: Rocket<Build>) -> Rocket<Build> {
    use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

    const MIGRATIONS: EmbeddedMigrations = embed_migrations!("db/migrations");
    
    Db::get_one(&rocket).await
    .expect("database connection")
    .run(|conn| { conn.run_pending_migrations(MIGRATIONS).expect("diesel migrations"); })
    .await;

rocket
}

pub fn stage() -> AdHoc {
    AdHoc::on_ignite("Diesel SQLite Stage", |rocket| async {
        rocket
            .attach(Db::fairing())
            .attach(AdHoc::on_ignite("Diesel migrations", run_migrations))
            .mount(
                "/diesel",
                routes![user_lists, create_user, login, user_by_id, exampleCheck, create_pet, pet_list, pets_by_user],
            )
    })
}