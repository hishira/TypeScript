#![allow(proc_macro_derive_resolution_fallback)]
#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_sync_db_pools;
#[macro_use] extern crate diesel_migrations;   
#[macro_use] extern crate diesel;
extern crate bcrypt;
extern crate jsonwebtoken;
extern crate chrono;

mod api;
mod config;
mod models;
mod schema;
mod jwt;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(config::stage())
}