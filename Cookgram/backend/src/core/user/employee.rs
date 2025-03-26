use super::{user::User, userid::UserId};
use crate::core::{
    entity::{entity::IdGenerator, Entity},
    usercontract::usercontract::Contract,
};

#[derive(PartialEq, Debug, Clone)]
pub struct Employee {
    pub user: User,
    pub contract: Option<Contract>,
}

impl Entity for Employee {
    fn generate_id() -> impl IdGenerator {
        UserId::default()
    }
}
