use serde::{Deserialize, Serialize};

use super::entitystate::EntityState;

#[derive(Serialize, Deserialize)]
pub struct State {
    pub current: EntityState,
    pub previus: EntityState,
}
