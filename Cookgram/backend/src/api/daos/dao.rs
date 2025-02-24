use sqlx::{postgres::PgQueryResult, Executor, Postgres};
use uuid::Uuid;

use crate::core::entity::Entity;
use async_trait::async_trait;

#[async_trait]
pub trait DAO<T: Entity, O> {
    async fn create<'a, E>(
        &self,
        entity: T,
        executor: Option<E>,
    ) -> Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send;

    async fn find(&self, option: O) -> Result<Vec<T>, sqlx::Error>;

    async fn find_by_id(&self, id: Uuid) -> Result<T, sqlx::Error>;

    async fn delete(&self, entity: T) -> Result<PgQueryResult, sqlx::Error>;
}

#[async_trait]
pub trait SmallDAO<T, O> {
    async fn create<'a, E>(
        &self,
        entity: T,
        executor: Option<E>,
    ) -> Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send;

    async fn find(&self, option: O) -> Result<Vec<T>, sqlx::Error>;

    async fn find_by_id(&self, id: Uuid) -> Result<T, sqlx::Error>;

    async fn delete(&self, entity: T) -> Result<PgQueryResult, sqlx::Error>;
}
