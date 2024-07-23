use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::core::entity::entity::IdGenerator;

#[derive(PartialEq, Debug, Clone, Deserialize)]
pub struct MetaId(Uuid);

impl MetaId {
    pub fn default() -> Self {
        Self::generate_id()
    }
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

impl IdGenerator for MetaId {
    fn get_id(&self) -> Uuid {
        self.get_id()
    }
}

impl Serialize for MetaId {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_str(&self.0.to_string().to_owned());
        state
    }
}