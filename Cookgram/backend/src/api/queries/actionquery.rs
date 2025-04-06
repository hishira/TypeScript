use crate::core::entity::Entity;
use sqlx::{Postgres, QueryBuilder};

pub trait ActionQueryBuilder<T: Entity> {
    fn create(entity: T) -> QueryBuilder<'static, Postgres>;
    fn update(entity: T) -> QueryBuilder<'static, Postgres>;
    fn delete(entity: T) -> QueryBuilder<'static, Postgres>;
}
