use crate::core::entity::Entity;

pub trait DAO<T: Entity>{
    fn create(entity: T) -> T;
}