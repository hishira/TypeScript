use serde::{Deserialize, Serialize};

use crate::{
    api::dtos::addressdto::addressdto::AddressDto,
    core::{
        address::address::Address,
        entity::Entity,
        meta::meta::Meta,
        state::{entitystate::EntityState, state::State},
        user::{
            credentials::Credentials, personalinformation::PersonalInformation, userid::UserId,
        },
    },
};

use super::{credentialsdto::CredentialsDTO, personalinformationdto::PersolanInformationDTO};

#[derive(PartialEq, Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthenticationUserDto {
    pub id: UserId,
    pub personal_information: PersolanInformationDTO,
    pub credentials: CredentialsDTO,
    pub address: Option<AddressDto>,
    pub meta: Meta,
    pub state: State<EntityState>,
}

impl Entity for AuthenticationUserDto {
    fn generate_id() -> impl crate::core::entity::entity::IdGenerator {
        UserId::default()
    }
}
