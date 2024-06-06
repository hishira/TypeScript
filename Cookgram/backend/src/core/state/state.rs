use serde::{Deserialize, Serialize};

use super::entitystate::EntityState;

#[derive(Serialize, Deserialize, Clone, PartialEq, Debug)]
pub struct State {
    pub current: EntityState,
    pub previus: Option<EntityState>,
}

impl State {
    pub fn update(&mut self, state: State) {
        self.current = state.current;
        self.previus = state.previus;
    }
}
