use sqlx::{Postgres, QueryBuilder};

pub trait Query<T> {
    fn build(&self) -> String;
    fn find(option: T) -> QueryBuilder<'static, Postgres>;
    fn find_by_id(id: uuid::Uuid) -> QueryBuilder<'static, Postgres>;
}