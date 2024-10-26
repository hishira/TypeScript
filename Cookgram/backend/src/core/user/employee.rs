use serde::{Deserialize, Serialize};

use crate::core::{entity::{entity::IdGenerator, Entity}, usercontract::usercontract::Contract};

use super::{user::User, userid::UserId};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Employee {
    pub user: User,
    pub contract: Option<Contract>,
}

impl Entity for Employee {
    fn generate_id() -> impl IdGenerator {
        UserId::default()
    }
}
