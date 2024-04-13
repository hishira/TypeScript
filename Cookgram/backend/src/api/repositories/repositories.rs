use uuid::Uuid;

use crate::core::entity::Entity;

pub trait Repository<E: Entity, ActionOption>: Send + Sync {
    async fn create(&self, entity: E) -> E;
    async fn find(&self, option: ActionOption) -> Vec<E>;
    async fn find_by_id(&self, id: Uuid) -> E;
    async fn delete(&self, option: E) -> E;
    fn update(update_entity: E) -> E;
}
