use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, PartialEq, Debug)]
pub struct State<T> {
    pub current: T,
    pub previous: Option<T>,
}

impl<T> State<T> {
    pub fn update(&mut self, state: State<T>) {
        self.current = state.current;
        self.previous = state.previous;
    }
}
