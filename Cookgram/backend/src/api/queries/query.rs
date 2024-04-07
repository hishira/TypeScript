use sqlx::{Postgres, QueryBuilder};

pub trait Query<T> {
    fn build(&self) -> String;
    fn find(&self, option: T) -> QueryBuilder<'static, Postgres>;
}