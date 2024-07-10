use std::{
    future::ready,
    net::{IpAddr, Ipv4Addr, SocketAddr},
    time::Instant,
};

use crate::api::{logs::applicationlog::ApplicationLog, router::authrouter::AuthRouter};
use api::{
    router::{router::ApplicationRouter, userrouter::UserRouter},
    utils::cors::CORS,
};
use axum::{
    extract::{DefaultBodyLimit, MatchedPath, Request},
    http::header::{AUTHORIZATION, CONTENT_TYPE},
    middleware::{self, Next},
    response::IntoResponse,
    Router,
};
use metrics_exporter_prometheus::{Matcher, PrometheusBuilder, PrometheusHandle};
use tokio::{net::TcpListener, signal};
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing::info_span;

mod api;
mod core;
mod database;

#[tokio::main]
async fn main() {
    let (_main_service, _metrics_service) = tokio::join!(start_main_app(), start_metrics_server());
}

async fn shutdown() {
    let ctrl_c_shutdown = async {
        signal::ctrl_c()
            .await
            .expect("Failed to ctrl + c signal handler");
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();
    tokio::select! {
     _ = ctrl_c_shutdown => {},
     _ = terminate => {}
    }
}

fn metrics_app() -> Router {
    let recorder_handle = setup_metrics_recorder();
    Router::new().route(
        "/metrics",
        axum::routing::get(move || ready(recorder_handle.render())),
    )
}
async fn start_metrics_server() {
    let app = metrics_app();
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3001")
        .await
        .unwrap();
    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn start_main_app() {
    ApplicationLog::register_tracing();
    let database = database::init::Database::new().await;
    database.prepare_tables().await;
    let app = Router::new()
        .nest("/user", UserRouter::new(&database).get_router())
        .nest("/auth", AuthRouter::new(&database).get_router())
        .route_layer(middleware::from_fn(track_metrics))
        .layer(DefaultBodyLimit::max(104857000))
        .layer(CORS::default())
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
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown())
        .await
        .unwrap();
}
fn setup_metrics_recorder() -> PrometheusHandle {
    const EXPONENTIAL_SECONDS: &[f64] = &[
        0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0,
    ];

    PrometheusBuilder::new()
        .with_http_listener(SocketAddr::new(
            IpAddr::V4(Ipv4Addr::new(192, 168, 1, 42)),
            9090,
        ))
        .set_buckets_for_metric(
            Matcher::Full("http_request_duration_seconds".to_string()),
            EXPONENTIAL_SECONDS,
        )
        .unwrap()
        .install_recorder()
        .unwrap()
}

async fn track_metrics(req: Request, next: Next) -> impl IntoResponse {
    let start = Instant::now();
    let path = if let Some(matched_path) = req.extensions().get::<MatchedPath>() {
        matched_path.as_str().to_owned()
    } else {
        req.uri().path().to_owned()
    };
    let method = req.method().clone();

    let response = next.run(req).await;

    let latency = start.elapsed().as_secs_f64();
    let status = response.status().as_u16().to_string();

    let labels = [
        ("method", method.to_string()),
        ("path", path),
        ("status", status),
    ];

    metrics::counter!("http_requests_total", &labels).increment(1);
    metrics::histogram!("http_requests_duration_seconds", &labels).record(latency);

    response
}
