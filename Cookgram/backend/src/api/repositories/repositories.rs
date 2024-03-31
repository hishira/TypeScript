use uuid::Uuid;

use crate::core::entity::Entity;

pub trait Repositories<T: Entity, ActionOption> {
    fn create(entity: T) -> T;
    fn find_by_id(id: Uuid) -> T;
    fn find(option: ActionOption) -> Vec<T>;
    fn delete(option: ActionOption);
    fn update(update_entity: T) -> T;
}
