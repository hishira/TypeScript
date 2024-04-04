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

    fn find(option: MetaFilterOption) -> Vec<Meta> {
        todo!()
    }

    fn find_by_id(id: uuid::Uuid) -> Meta {
        todo!()
    }

    fn delete(option: Meta) -> Meta {
        todo!()
    }

    fn update(update_entity: Meta) -> Meta {
        todo!()
    }
}
