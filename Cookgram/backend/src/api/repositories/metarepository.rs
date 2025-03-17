use sqlx::{Pool, Postgres};

use crate::core::meta::meta::Meta;

use super::repositories::Repository;

#[derive(Clone)]
pub struct MetaRepository {
    pub pool: Pool<Postgres>,
}

#[derive(Clone)]
pub struct MetaFilterOption {}
impl Repository<Meta, MetaFilterOption, sqlx::Error> for MetaRepository {
    async fn create(&self, _entity: Meta) -> Meta {
        todo!()
    }

    async fn find(&self, _option: MetaFilterOption) -> Result<Vec<Meta>, sqlx::Error> {
        todo!()
    }

    async fn find_by_id(&self, _id: uuid::Uuid) -> Meta {
        todo!()
    }

    async fn delete(&self, _option: Meta) -> Meta {
        todo!()
    }

    async fn update(&self, _update_entity: Meta) -> Meta {
        todo!()
    }
}
