use uuid::Uuid;

use crate::core::meta::meta::Meta;

pub trait Entity: Send + Sync{
    fn generate_id() -> Uuid;
}