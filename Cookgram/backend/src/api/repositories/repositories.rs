use uuid::Uuid;

use crate::core::entity::Entity;

pub trait Repository<E: Entity, ActionOption>: Send + Sync {
    async fn create(&self, entity: E) -> E;
    async fn find(&self, option: ActionOption) -> Vec<E>;
    fn find_by_id(id: Uuid) -> E;
    fn delete(option: E) -> E;
    fn update(update_entity: E) -> E;
}
