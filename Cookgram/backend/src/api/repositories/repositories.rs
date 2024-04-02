use uuid::Uuid;

use crate::core::entity::Entity;

pub trait Repository<E: Entity, ActionOption>: Send + Sync {
    async fn create(&self, entity: E) -> E;
    fn find(option: ActionOption) -> Vec<E>;
    fn find_by_id(id: Uuid) -> E;
    fn delete(option: E) -> E;
    fn update(update_entity: E) -> E;
}
