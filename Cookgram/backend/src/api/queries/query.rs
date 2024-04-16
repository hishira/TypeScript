use sqlx::{Postgres, QueryBuilder};

pub trait Query<T> {
    fn build(&self) -> String;
    fn find(&self, option: T) -> QueryBuilder<'static, Postgres>;
    fn find_by_id(&self, id: uuid::Uuid) -> QueryBuilder<'static, Postgres>;
}