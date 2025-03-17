use serde::{Deserialize, Serialize};

use crate::core::user::contact::Contacts;

#[derive(PartialEq, Debug, Clone, Deserialize, Serialize)]
pub struct ContactDTO {
    pub email: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
}

pub fn convert_to_co_contacts_dto(contancts: Contacts) -> ContactDTO {
    ContactDTO {
        email: contancts.email,
        phone: contancts.phone,
        fax: contancts.fax,
    }
}
