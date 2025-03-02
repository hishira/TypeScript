use super::contactdto::{convert_to_co_contacts_dto, ContactDTO};
use crate::core::user::personalinformation::{Gender, PersonalInformation};
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use validator::Validate;

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

pub fn from_personal_info_to_dto(personla_info: PersonalInformation)-> PersolanInformationDTO{
    PersolanInformationDTO {
        first_name: personla_info.first_name,
        last_name: personla_info.last_name,
        brithday: personla_info.brithday,
        email: personla_info.email,
        gender: personla_info.gender.unwrap_or(Gender::None),
        contacts: personla_info.contacts.map(convert_to_co_contacts_dto)
    }
}
