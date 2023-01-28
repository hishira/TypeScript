#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_sync_db_pools;
#[macro_use] extern crate diesel;
extern crate bcrypt;
extern crate jsonwebtoken;
extern crate chrono;

mod api;
mod config;
mod models;
mod schema;
mod jwt;
mod utils;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(config::stage())
}