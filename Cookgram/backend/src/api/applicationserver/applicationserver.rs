use axum::{
    extract::{DefaultBodyLimit, MatchedPath, Request},
    middleware, Router,
};
use tokio::{net::TcpListener, signal};
use tower_http::trace::TraceLayer;
use tracing::info_span;

use crate::{
    api::{
        logs::applicationlog::ApplicationLog,
        metrics::metricsserver::MetricsServer,
        router::{authrouter::AuthRouter, router::ApplicationRouter, userrouter::UserRouter},
        utils::cors::CORS,
    },
    database::{self, init::Database},
};

pub struct ApplicationServer {}

impl ApplicationServer {
    fn create_router(database: &Database) -> Router {
        Router::new()
            .nest("/user", UserRouter::new(&database).get_router())
            .nest("/auth", AuthRouter::new(&database).get_router())
            .route_layer(middleware::from_fn(MetricsServer::track_metrics))
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
            )
    }
    async fn prepare_database() -> Database {
        let database = database::init::Database::new().await;
        database.prepare_tables().await;
        database
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
    pub async fn start_main_app() {
        ApplicationLog::register_tracing();
        let database = Self::prepare_database().await;
        let app = Self::create_router(&database);
        let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
        tracing::debug!("listening on {}", listener.local_addr().unwrap());
        axum::serve(listener, app)
            .with_graceful_shutdown(Self::shutdown())
            .await
            .unwrap();
    }
}
