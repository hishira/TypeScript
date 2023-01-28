use std::time::SystemTime;
use diesel::RunQueryDsl;
use rocket::serde::{ Deserialize, Serialize};
use crate::{schema::meta, config::Db};
use crate::schema::meta::dsl::*;
use chrono::{NaiveDateTime, Local};

#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable, Identifiable)]
#[serde(crate = "rocket::serde")]
#[table_name = "meta"]
pub struct Meta {
    pub id: i32,
    pub create_date: NaiveDateTime,
    pub edit_date: NaiveDateTime
}

#[derive(Debug, Insertable, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[table_name = "meta"]
pub struct MetaForm{
    pub create_date: NaiveDateTime,
    pub edit_date: NaiveDateTime
}

impl Meta {
    pub async fn create(db: &Db) {
        let now = Local::now().naive_local();
        let time = MetaForm {
            create_date: now,
            edit_date: now
        };
        let result  = db.run(move |conn| {
            diesel::insert_into(meta::table)
            .values(&time)
            .returning(id)
            .get_results(conn)
        }).await;

        
    }
}