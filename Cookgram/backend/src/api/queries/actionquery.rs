use sqlx::{postgres::PgArguments, query::Query, Postgres, QueryBuilder};

use crate::core::entity::Entity;

pub trait ActionQuery<T: Entity> {
    fn create(&self, entity: T) -> QueryBuilder< Postgres>;
    fn update(&self, entity: T) -> String;
    fn delete(&self, entity: T) -> String;
}