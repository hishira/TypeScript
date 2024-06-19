use serde::{Deserialize, Serialize};

use crate::core::address::address::Address;

#[derive(Serialize,Deserialize)]
pub struct Contact {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub address: Option<Address>,
    pub email: String,
    pub phone_number: String,
}