use crate::core::{
    address::address::Address, metaobject::metaobject::MetaObject, state::state::State,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum CompanyState {
    Active,
    Inactive,
    UnderInvestigation,
    Closed,
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Company {
    pub name: String,
    pub address: Option<Address>,
    pub owner_id: Uuid,
    pub state: State<CompanyState>,
    pub employees: Vec<Uuid>,
    pub meta: MetaObject,
}

impl Company {
    pub fn append_employeed(&mut self, user_id: Uuid) {
        self.employees.push(user_id);
    }
}
