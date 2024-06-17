use uuid::Uuid;

use crate::core::address::address::Address;

pub struct Company {
    pub name: String,
    pub address: Option<Address>,
    pub owner_id: Uuid,
    
}