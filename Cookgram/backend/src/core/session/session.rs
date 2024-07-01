use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize)]
pub struct Session {
    user_id: Uuid,
    token: String,
    active: bool,
}