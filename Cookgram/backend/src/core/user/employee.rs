use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::core::{entity::Entity, usercontract::usercontract::UserContract};

use super::user::User;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Employee {
    pub user: User,
    pub contract: Option<UserContract>,
}

impl Entity for Employee {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}
