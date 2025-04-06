use super::{employee::Employee, user::User};
use crate::core::usercontract::usercontract::Contract;

#[derive(PartialEq, Debug, Clone)]
pub struct Manager {
    pub user: User,
    pub contract: Option<Contract>,
    pub managed_users: Option<Vec<Employee>>,
}
