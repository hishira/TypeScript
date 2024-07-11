
use api::{
    applicationserver::applicationserver::ApplicationServer,
    metrics::metricsserver::MetricsServer,

};
use axum::{
    http::header::{AUTHORIZATION, CONTENT_TYPE},
};
use redis::{AsyncCommands, RedisError};

mod api;
mod core;
mod database;

#[tokio::main]
async fn main() {
    match fetch_an_integer().await {
        Ok(ok) => {
            println!("OK");
        }
        Err(err) => {
            tracing::error!("{}", err);
        }
    };
    let (_main_service, _metrics_service) = tokio::join!(
        ApplicationServer::start_main_app(),
        MetricsServer::start_metrics_server()
    );
}

// async fn fetch_an_integer() -> redis::RedisResult<()> {
//     // connect to redis
//     let redis_connection_string = ;
//     let client = redis::Client::open(redis_connection_string).unwrap();
//     let mut con = client.get_multiplexed_async_connection().await?;

//     let _: () = con.set("key1", b"foo").await?;

//     // redis::cmd("SET")
//     //     .arg(&["key2", "bar"])
//     //     .execute(&mut con)
//     //     .await?;

//     let result: Result<String, RedisError> = redis::cmd("MGET")
//         .arg(&["key1"])
//         .query_async(&mut con)
//         .await;
//     match result {
//         Ok(ok) => println!("{}", ok),
//         Err(error) => tracing::error!("{}", error),
//     };
//     Ok(())
// }
