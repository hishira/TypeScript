use std::time::Duration;

use sqlx::{postgres::PgPoolOptions, Executor};

mod database;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    // // let db_connection_string = dotenv::var("DATABASE_URL").unwrap();
    // // println!("{db_connection_string}");
    // // let pool = PgPoolOptions::new()
    // //     .max_connections(5)
    // //     .acquire_timeout(Duration::from_secs(3))
    // //     .connect(&db_connection_string)
    // //     .await
    // //     .expect("can't connect to database");
    // // let result = pool.execute(include_str!("./database/schema.sql")).await;
    // // match result {
    // //     Ok(r) => {
    // //         println!("{}", r.rows_affected())
    // //     }
    // //     Err(error) => println!("{}", error.to_string()),
    // // };
    // pool.close().await;
    let database = database::init::Database::new().await;
    database.prepareTables().await;
    Ok(())
}
