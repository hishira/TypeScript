use serde::Serialize;

use crate::core::{
    entity::Entity,
    role::role::Roles,
    state::{entitystate::EntityState, state::State},
    user::userid::UserId,
};

use super::credentialsdto::CredentialsDTO;

#[derive(PartialEq, Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthenticationUserDto {
    pub id: UserId,
    pub credentials: CredentialsDTO,
    pub role: Roles,
    pub state: State<EntityState>,
}

impl Entity for AuthenticationUserDto {
    fn generate_id() -> impl crate::core::entity::entity::IdGenerator {
        UserId::default()
    }
}
