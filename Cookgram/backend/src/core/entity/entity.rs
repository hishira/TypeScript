use uuid::Uuid;

use crate::core::meta::meta::Meta;

pub trait Entity: Send + Sync{
    fn generate_id() -> impl IdGenerator;
}

pub trait IdGenerator: Send + Sync {
    fn get_id(&self) -> Uuid;
}