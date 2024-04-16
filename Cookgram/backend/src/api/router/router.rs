use axum::Router;

pub trait ApplicationRouter {
    fn get_router(&self)->Router;
}