use sqlx::{ Postgres, QueryBuilder};

use crate::core::entity::Entity;

pub trait ActionQueryBuilder<T: Entity> {
    fn create(&self, entity: T) -> QueryBuilder<Postgres>;
    fn update(&self, entity: T) -> QueryBuilder<Postgres>;
    fn delete(&self, entity: T) -> String;
}