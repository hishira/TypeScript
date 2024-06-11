use crate::api::{logs::applicationlog::ApplicationLog, router::authrouter::AuthRouter};
use api::router::{router::ApplicationRouter, userrouter::UserRouter};
use axum::{
    extract::{DefaultBodyLimit, MatchedPath},
    http::{
        header::{AUTHORIZATION, CONTENT_TYPE},
        Request,
    },
    Router,
};
use tokio::net::TcpListener;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing::info_span;

mod api;
mod core;
mod database;

#[tokio::main]
async fn main() {
    ApplicationLog::register_tracing();
    let database = database::init::Database::new().await;
    database.prepare_tables().await;
    let cors_layer = CorsLayer::new()
        .allow_headers([CONTENT_TYPE, AUTHORIZATION])
        .allow_methods([
            axum::http::Method::GET,
            axum::http::Method::POST,
            axum::http::Method::PUT,
            axum::http::Method::DELETE,
        ]);
    let app = Router::new()
        .nest("/test", UserRouter::new(&database).get_router())
        .nest("/testauth", AuthRouter::new(&database).get_router())
        .layer(DefaultBodyLimit::max(104857000))
        .layer(cors_layer)
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
