use serde::{Deserialize, Serialize};

use crate::core::usercontract::usercontract::Contract;

use super::{employee::Employee, user::User};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Manager {
    pub user: User,
    pub contract: Option<Contract>,
    pub managed_users: Option<Vec<Employee>>,
}