use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

pub struct ApplicationLog {}

impl ApplicationLog {
    pub fn register_tracing() -> () {
        tracing_subscriber::registry()
            .with(
                tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                    // axum logs rejections from built-in extractors with the `axum::rejection`
                    // target, at `TRACE` level. `axum::rejection=trace` enables showing those events
                    "backend=debug,tower_http=debug,axum::rejection=trace".into()
                }),
            )
            .with(tracing_subscriber::fmt::layer())
            .init();
    }
}