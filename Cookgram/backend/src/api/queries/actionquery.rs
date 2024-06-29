use sqlx::{ Postgres, QueryBuilder};

use crate::core::entity::Entity;

pub trait ActionQueryBuilder<T: Entity> {
    fn create(entity: T) -> QueryBuilder<'static, Postgres>;
    fn update(&self, entity: T) -> QueryBuilder<Postgres>;
    fn delete(&self, entity: T) -> QueryBuilder<Postgres>;
}