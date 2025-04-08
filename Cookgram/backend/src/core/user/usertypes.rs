use super::user::User;
use crate::core::usercontract::usercontract::Contract;

// IF we need it? using composition?
pub enum UserTypes {
    Employee(User),
    Manager(User),
    Director(User),
}

impl UserTypes {
    pub fn get_active_contracts(&self) -> Vec<Contract> {
        match self {
            UserTypes::Employee(_) => panic!("User cannot have contracts"),
            UserTypes::Manager(_) => todo!(), // Should return contacts with user references
            UserTypes::Director(_) => todo!(),
        }
    }
}
