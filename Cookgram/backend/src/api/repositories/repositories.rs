use uuid::Uuid;

use crate::core::entity::Entity;

pub trait Repositories<E: Entity, ActionOption> {
    fn create(entity: E) -> E;
    fn find(option: ActionOption) -> Vec<E>;
    fn find_by_id(id: Uuid) -> E;
    fn delete(option: E) -> E;
    fn update(update_entity: E) -> E;
}
