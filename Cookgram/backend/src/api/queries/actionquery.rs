use crate::core::entity::Entity;

pub trait ActionQuery<T: Entity> {
    fn create(&self, entity: T) -> String;
    fn update(&self, entity: T) -> String;
    fn delete(&self, entity: T) -> String;
}