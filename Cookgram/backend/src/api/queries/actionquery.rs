use sqlx::{Postgres, QueryBuilder};

use crate::core::entity::Entity;

pub trait ActionQueryBuilder<T: Entity> {
    fn create(entity: T) -> QueryBuilder<'static, Postgres>;
    fn update(entity: T) -> QueryBuilder<'static, Postgres>;
    fn delete(entity: T) -> QueryBuilder<'static, Postgres>;
}
