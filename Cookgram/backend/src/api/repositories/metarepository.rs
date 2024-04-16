use sqlx::{Pool, Postgres};

use crate::core::meta::meta::Meta;

use super::repositories::Repository;

#[derive(Clone)]
pub struct MetaRepository {
    pub pool: Pool<Postgres>,
}

#[derive(Clone)]
pub struct MetaFilterOption {}
impl Repository<Meta, MetaFilterOption> for MetaRepository {
    async fn create(&self, entity: Meta) -> Meta {
        todo!()
    }

    async fn find(&self, option: MetaFilterOption) -> Vec<Meta> {
        todo!()
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Meta {
        todo!()
    }

    async fn delete(&self, option: Meta) -> Meta {
        todo!()
    }

    async fn update(&self, update_entity: Meta) -> Meta {
        todo!()
    }
}
