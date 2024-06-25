use axum::http::{
    header::{AUTHORIZATION, CONTENT_TYPE},
    HeaderName,
};
use tower_http::cors::{ Any, CorsLayer };

pub struct CORS;

impl CORS {
    pub fn create_cqrs_layer(
        allowed_headers: Vec<HeaderName>,
        allowed_methods: Vec<axum::http::Method>,
    ) -> CorsLayer {
        CorsLayer::new()
            .allow_headers(allowed_headers)
            .allow_methods(allowed_methods)
    }

    pub fn default() -> CorsLayer {
        CorsLayer::new()
            .allow_headers([CONTENT_TYPE, AUTHORIZATION])
            .allow_methods([
                axum::http::Method::GET,
                axum::http::Method::POST,
                axum::http::Method::PUT,
                axum::http::Method::DELETE,
            ])
            .allow_origin(Any)

    }
}
