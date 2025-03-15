use crate::core::{address::address::Address, animal::animal::Animal, user::user::User};
use uuid::Uuid;

pub struct Shelter {
    pub id: Uuid,
    pub name: String,
    pub address: Option<Address>,
    pub animals: Vec<Animal>,
    pub staff: Vec<User>,
}
