use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::core::entity::entity::IdGenerator;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct UserId(Uuid);

impl UserId {
    pub fn generate_id() -> Self {
        Self(Uuid::new_v4())
    }

    pub fn from_id(id: Uuid) -> Self {
        Self(id)
    }

    pub fn get_id(&self) -> Uuid {
        self.0
    }
}

impl IdGenerator for UserId {
    fn get_id(&self) -> Uuid {
        self.get_id()
    }
}
