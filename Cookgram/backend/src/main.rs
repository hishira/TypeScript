use api::{
    applicationserver::applicationserver::ApplicationServer, metrics::metricsserver::MetricsServer,
};

mod api;
mod core;
mod database;

#[tokio::main]
async fn main() {
    let (_main_service, _metrics_service) = tokio::join!(
        ApplicationServer::start_main_app(),
        MetricsServer::start_metrics_server()
    );
}
