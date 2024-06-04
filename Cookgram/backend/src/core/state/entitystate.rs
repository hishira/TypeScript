use serde::{Deserialize, Serialize};

use super::userstate::UserState;

#[derive(Serialize, Deserialize)]
pub enum EntityState {
    User(UserState),
}
