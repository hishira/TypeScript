use sqlx::{Postgres, QueryBuilder};

use crate::{api::queries::actionquery::ActionQueryBuilder, core::meta::meta::Meta};

pub struct MetaQuery {}

impl ActionQueryBuilder<Meta> for MetaQuery {
    fn create(&self, entity: Meta) -> sqlx::QueryBuilder<sqlx::Postgres> {
        let mut create_builder: QueryBuilder<Postgres> =
            QueryBuilder::new("INSERT INTO META(id, create_date, edit_date) ");
        create_builder.push_values(vec![entity], |mut builder, meta| {
            builder
                .push_bind(meta.id)
                .push_bind(meta.create_date)
                .push_bind(meta.edit_date);
        });
        create_builder.push(" RETURNING id, create_date, edit_date");
        create_builder
    }

    fn update(&self, entity: Meta) -> sqlx::QueryBuilder<sqlx::Postgres> {
        let mut update_builder: QueryBuilder<Postgres> = QueryBuilder::new("UPDATE META SET edit_date = ");
        update_builder.push_bind(entity.edit_date);
        update_builder.push("where id = ");
        update_builder.push_bind(entity.id);
        update_builder
    }

    fn delete(&self, entity: Meta) -> QueryBuilder< Postgres>   {
        todo!()
    }
}
