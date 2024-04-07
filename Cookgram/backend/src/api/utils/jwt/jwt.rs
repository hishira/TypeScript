use once_cell::sync::Lazy;
use serde::{Deserialize, Serialize};


#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub user_id: Option<uuid::Uuid>,
    pub user_info: String,
}