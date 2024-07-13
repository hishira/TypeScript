use std::process;

use tracing_loki::url::Url;
use tracing_subscriber::{fmt::format, layer::SubscriberExt, util::SubscriberInitExt};

pub struct ApplicationLog {}

impl ApplicationLog {
    pub fn register_tracing() -> Result<(), tracing_loki::Error> {
        let (layer, task) = tracing_loki::builder()
            .label("host", "mine")?
            .extra_field("pid", format!("{}", process::id()))?
            .build_url(Url::parse(dotenv::var("LOKI_URL").unwrap().leak()).unwrap())?;
        tracing_subscriber::registry()
            .with(
                tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                    // axum logs rejections from built-in extractors with the `axum::rejection`
                    // target, at `TRACE` level. `axum::rejection=trace` enables showing those events
                    "backend=debug,tower_http=debug,axum::rejection=trace".into()
                }),
            )
            .with(tracing_subscriber::fmt::layer())
            .with(layer)
            .init();
        tokio::spawn(task);

        tracing::info!(
            task = "tracing_setup",
            result = "success",
            "tracing successfully set up",
        );
        Ok(())
    }
}
