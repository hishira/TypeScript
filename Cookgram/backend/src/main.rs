use core::{entity::Entity, user::user::User};

use api::{
    appstate::appstate::AppState,
    queries::userquery::userquery::UserQuery,
    repositories::{repositories::Repository, userrepositories::{UserFilterOption, UserRepositories}},
};
use axum::{extract::State, http::StatusCode, routing::post, Json, Router};
use serde::Deserialize;
use tokio::net::TcpListener;

mod api;
mod core;
mod database;

#[tokio::main]
async fn main(){
    let database = database::init::Database::new().await;
    database.prepare_tables().await;

    let user_repo = UserRepositories {
        pool: database.pool.unwrap(),
        user_queries: UserQuery::new(None, None, None),
    };

    let generic = Router::new()
        .route("/users", post(user_create::<UserRepositories>))
        .with_state(AppState {
            repo: user_repo,
        });
    let app = Router::new().nest("/test", generic);
    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
    
}

#[derive(Deserialize)]
struct UserParams {
    name: String,
}

async fn user_create<T>(State(state): State<AppState<T>>, Json(params): Json<UserParams>,) -> Json<User> where T: Repository<User, UserFilterOption> {
    let user = User::new(None, "test_usernam".to_string(), "test_usernam".to_string(), "test_usernam".to_string(), None);
    state.repo.create(user.clone()).await;
    Json(user)
}
