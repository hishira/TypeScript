use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::core::{address::address::Address, metaobject::metaobject::MetaObject, state::state::State};

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
    pub meta: MetaObject,
    pub employees: Vec<Uuid>
}
