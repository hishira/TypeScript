use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use validator::Validate;

use crate::core::user::personalinformation::Gender;

use super::contactdto::ContactDTO;

#[derive(PartialEq, Debug, Clone, Deserialize, Validate, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PersolanInformationDTO {
    pub first_name: String,
    pub last_name: String,
    pub brithday: OffsetDateTime,
    #[validate(email)]
    pub email: Option<String>,
    pub gender: Gender,
    pub contacts: Option<ContactDTO>,
}
