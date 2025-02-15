
use sqlx::{Pool, Postgres};

#[derive(Clone)]
pub struct AuthenticationDAO {
    pub pool: Pool<Postgres>,
}

impl AuthenticationDAO {
    async fn find(&self) -> Result<Vec<i32>, sqlx::Error> {
        todo!();
    } 
}