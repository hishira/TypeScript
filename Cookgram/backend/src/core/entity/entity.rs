use uuid::Uuid;

use crate::core::meta::meta::Meta;

pub trait Entity{
    fn generate_id() -> Uuid;
}