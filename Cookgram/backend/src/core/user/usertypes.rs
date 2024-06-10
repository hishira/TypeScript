use crate::core::usercontract::usercontract::UserContract;

use super::user::User;

pub enum UserTypes {
    Employee(User),
    Manager(User),
    Director(User),
}

impl UserTypes {
    pub fn get_active_contracts(&self) -> Vec<UserContract> {
        match self {
            UserTypes::Employee(_) => panic!("User cannot have contracts"),
            UserTypes::Manager(_) => todo!(), // Should return contacts with user references
            UserTypes::Director(_) => todo!(),
        }
    }
}
