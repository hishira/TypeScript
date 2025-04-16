use super::{
    contactdto::{convert_to_co_contacts_dto, ContactDTO},
    genderdto::{convert_gender_to_gender_dto, GenderDTO},
};
use crate::core::user::personalinformation::PersonalInformation;
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use validator::Validate;

#[derive(PartialEq, Debug, Clone, Deserialize, Validate, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PersolanInformationDTO {
    pub first_name: String,
    pub last_name: String,
    #[serde(with = "time::serde::rfc3339")]
    pub brithday: OffsetDateTime,
    #[validate(email)]
    pub email: Option<String>,
    pub gender: GenderDTO,
    pub contacts: Option<ContactDTO>,
}

pub fn from_personal_info_to_dto(personla_info: PersonalInformation) -> PersolanInformationDTO {
    PersolanInformationDTO {
        first_name: personla_info.first_name,
        last_name: personla_info.last_name,
        brithday: personla_info.brithday,
        email: personla_info.email,
        gender: personla_info
            .gender
            .map(convert_gender_to_gender_dto)
            .unwrap_or(GenderDTO::None),
        contacts: personla_info.contacts.map(convert_to_co_contacts_dto),
    }
}
