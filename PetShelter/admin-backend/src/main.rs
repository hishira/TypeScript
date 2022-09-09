#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_sync_db_pools;
#[macro_use] extern crate diesel_migrations;   
#[macro_use] extern crate diesel;

mod diesel_sql;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(diesel_sql::stage())
}