use serde::{Deserialize, Serialize};

use super::entitystate::EntityState;

#[derive(Serialize, Deserialize, Clone, PartialEq, Debug)]
pub struct State {
    pub current: EntityState,
    pub previus: Option<EntityState>,
}
