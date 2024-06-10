use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::entity::Entity;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct UserContract {
    pub id: Uuid,
    pub salary: f32,
    pub contract_start_datetime: OffsetDateTime,
    pub contract_end_datetime: OffsetDateTime,
}

impl Entity for UserContract {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}
