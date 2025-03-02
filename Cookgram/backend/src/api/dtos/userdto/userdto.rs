use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{api::dtos::roledto::roledto::{map_roles_to_role_dto, RoleDto}, core::{
        address::address::Address,
        meta::meta::Meta,
        state::{entitystate::EntityState, state::State},
        user::user::User,
    }};

use super::{
    credentialsdto::{get_credentials_dto_from_credentials, CredentialsDTO},
    operationuserdto::{CreateUserDto, DeleteUserDto, UpdateUserDto}, personalinformationdto::{from_personal_info_to_dto, PersolanInformationDTO},
};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserDTO {
    pub id: Uuid,
    pub personal_information: PersolanInformationDTO,
    pub credentials: CredentialsDTO,
    pub address: Option<Address>,
    pub meta: Meta,
    pub roles: RoleDto,
    pub state: State<EntityState>,
}

pub fn from_user_to_user_dto(user: User)->UserDTO {
    UserDTO {
        id: user.id.get_id(),
        address: user.address,
        credentials: get_credentials_dto_from_credentials(user.credentials),
        meta: user.meta,
        personal_information: from_personal_info_to_dto(user.personal_information),
        roles: map_roles_to_role_dto(user.role),
        state: user.state,
    }
}

trait Filter: Send + Sync {}

#[derive(Clone, Deserialize)]
pub struct UserFilterOption {
    pub username: Option<String>,
    pub limit: Option<i16>,
    pub offset: Option<i16>,
    pub owner_id: Option<Uuid>,
    pub with_admin: Option<bool>,
}

impl UserFilterOption {

    pub fn from_only_usernamr(username: String) -> Self {
        Self {
            username: Some(username),
            limit: Some(10),
            offset: Some(0),
            owner_id: None,
            with_admin: Some(true),
        }
    }
}

pub enum UserDtos {
    Create(CreateUserDto),
    Update(UpdateUserDto),
    Delete(DeleteUserDto),
}

#[derive(Debug, Deserialize)]
pub struct UserParamsDto {
    id: Option<uuid::Uuid>,
}