use sqlx::{postgres::PgQueryResult, Executor, Postgres};

use crate::core::entity::Entity;
use async_trait::async_trait;

#[async_trait]
pub trait DAO<T: Entity> {
    async fn create<'a, E>(&self, entity: T, executor: Option<E>) ->Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send;
}
