
use api::router::{router::ApplicationRouter, userrouter::UserRouter};
use axum::{
    extract::MatchedPath,
    http::{ Request},
    Router,
};
use tokio::net::TcpListener;
use tower_http::{ trace::TraceLayer};
use tracing::{info_span};
use crate::api::logs::applicationlog::ApplicationLog;

mod api;
mod core;
mod database;

#[tokio::main]
async fn main() {
    ApplicationLog::register_tracing();
    let database = database::init::Database::new().await;
    database.prepare_tables().await;

    let app = Router::new()
        .nest("/test", UserRouter::new(database).get_router())
        .layer(
            TraceLayer::new_for_http().make_span_with(|request: &Request<_>| {
                let matched_path = request
                    .extensions()
                    .get::<MatchedPath>()
                    .map(MatchedPath::as_str);

                info_span!(
                    "http_request",
                    method = ?request.method(),
                    matched_path,
                    some_other_field = tracing::field::Empty,
                )
            }),
        );
    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}
