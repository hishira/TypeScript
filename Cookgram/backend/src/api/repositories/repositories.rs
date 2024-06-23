use uuid::Uuid;

use crate::core::entity::Entity;

pub trait Repository<E: Entity, ActionOption, Error>: Send + Sync {
    async fn create(&self, entity: E) -> E;
    async fn find(&self, option: ActionOption) -> Result<Vec<E>, Error>;
    async fn find_by_id(&self, id: Uuid) -> E;
    async fn delete(&self, option: E) -> E;
    async fn update(&self, update_entity: E) -> E;
}
