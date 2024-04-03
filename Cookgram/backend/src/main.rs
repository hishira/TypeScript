use api::router::{router::ApplicationRouter, userrouter::UserRouter};
use axum::Router;
use tokio::net::TcpListener;

mod api;
mod core;
mod database;

#[tokio::main]
async fn main() {
    let database = database::init::Database::new().await;
    database.prepare_tables().await;

    let app = Router::new().nest("/test", UserRouter::new(database).get_router());
    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
