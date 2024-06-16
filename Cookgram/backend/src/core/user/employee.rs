use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::core::{entity::Entity, usercontract::usercontract::Contract};

use super::user::User;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Employee {
    pub user: User,
    pub contract: Option<Contract>,
}

impl Entity for Employee {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}
