
mod database;
mod core;
mod api;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
   let database = database::init::Database::new().await;
    database.prepare_tables().await;
    Ok(())
}
