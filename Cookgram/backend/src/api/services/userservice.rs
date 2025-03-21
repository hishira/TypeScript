use axum::Json;
use uuid::Uuid;

use crate::api::daos::userdao::UserDAO;
use crate::api::dtos::addressdto::createaddressdto::{build_address_based_on_create_dto, CreateUserAddressDto};
use crate::api::dtos::roledto::roledto::{map_to_roles, RoleDto};
use crate::api::dtos::userdto::operationuserdto::{CreateUserDto, DeleteUserDto, UpdateUserDto};
use crate::api::dtos::userdto::userdto::{from_user_to_user_dto, UserDTO, UserFilterOption};
use crate::api::errors::autherror::AuthError;
use crate::api::errors::responseerror::ResponseError;
use crate::api::repositories::repositories::Repository;
use crate::api::repositories::userrepositories::UserRepositories;
use crate::api::utils::user::user_utils::UserUtils;
use crate::core::role::role::Roles;
use crate::core::state::entitystate::EntityState;
use crate::core::state::state::State;

use crate::{api::dtos::userdto::userdto::UserDtos, core::user::user::User};

#[derive(Clone)]
pub struct UserService {
    pub user_dao: UserDAO,
    pub user_repo: UserRepositories,
}

impl UserService {
    pub fn new(user_dao: UserDAO, user_repo: UserRepositories) -> Self {
        Self {
            user_dao,
            user_repo,
        }
    }

    pub async fn get_users(&self, params: UserFilterOption) -> Result<Vec<UserDTO>, sqlx::Error> {
        self.user_dao.user_list(params).await.map(|result| {
            result
                .iter()
                .map(|user| from_user_to_user_dto(user.to_owned()))
                .collect()
        })
    }

    pub async fn create_user(&self, params: CreateUserDto) -> Result<Json<UserDTO>, ResponseError> {
        let user_tmp = UserUtils::get_from_dto(UserDtos::Create(params), None).await;
        match user_tmp {
            Ok(user) => {
                let user = self.user_repo.create(user).await;
                Ok(Json(from_user_to_user_dto(user)))
            }
            Err(error) => {
                tracing::error!("Error occur while user creation: {}", error);
                Err(ResponseError::from(error))
            }
        }
    }

    pub async fn create_managed_user(
        &self,
        params: CreateUserDto,
        owner_id: Uuid,
    ) -> Result<Json<UserDTO>, ResponseError> {
        let user = UserUtils::get_from_dto(UserDtos::Create(params), None).await?;
        let ids_touples = (owner_id, user.id.get_id());
        self.user_repo.create(user.clone()).await;
        let result = self.user_dao.create_user_connection(ids_touples).await;
        match result {
            Ok(_) => Ok(Json(from_user_to_user_dto(user))),
            Err(error) => {
                tracing::error!("User cannot be added {}", error);
                return Err(ResponseError::DatabaseError(
                    "Cannot create user".to_string(),
                ));
            }
        }
    }

    pub async fn get_managed_users(&self, filter_option: UserFilterOption) -> Vec<User> {
        self.user_repo.find(filter_option).await.unwrap_or(vec![])
    }

    pub async fn get_current_user(&self, user_id: Uuid) -> User {
        self.user_repo.find_by_id(user_id).await
    }

    pub async fn add_user_address(&self, params: CreateUserAddressDto) -> UserDTO {
        let user = self.user_repo.find_by_id(params.user_id).await;
        from_user_to_user_dto(
            self.user_repo
                .update(User::create_base_on_user_and_address(
                    user,
                    build_address_based_on_create_dto(params.address),
                ))
                .await,
        )
    }

    pub async fn update_user(
        &self,
        params: UpdateUserDto,
        user_id: Uuid,
    ) -> Result<UserDTO, ResponseError> {
        let user = self.user_repo.find_by_id(user_id).await;
        let updated_user = UserUtils::get_from_dto(UserDtos::Update(params), Some(user)).await?;
        Ok(from_user_to_user_dto(
            self.user_repo.update(updated_user.clone()).await,
        ))
    }

    fn check_is_admin_role(user_role: Option<Roles>) -> Result<bool, ResponseError> {
        Ok(user_role
            .ok_or(AuthError::MissingCredentials)
            .map_err(|e| ResponseError::AuthError(e))?
            .is_administration_role())
    }

    fn map_merge_params_with_owner(
        params: UserFilterOption,
        is_admin: bool,
        user_id: Uuid,
    ) -> UserFilterOption {
        let owner_id = (!is_admin).then(|| user_id);
        UserFilterOption {
            limit: params.limit,
            offset: params.offset,
            username: params.username,
            owner_id,
            with_admin: Some(false),
        }
    }
    pub async fn user_list(
        &self,
        user_id: Uuid,
        user_role: Option<RoleDto>,
        params: UserFilterOption,
    ) -> Result<Json<Vec<UserDTO>>, ResponseError> {
        let is_admin = Self::check_is_admin_role(user_role.map(map_to_roles))?;
        let params = Some(params)
            .map(|params| Self::map_merge_params_with_owner(params, is_admin, user_id))
            .unwrap();

        self.get_users(params).await.map(Json).map_err(|e| {
            tracing::error!("Error occur {}", e);
            e.into()
        })
    }

    pub async fn user_delete(&self, params: DeleteUserDto) -> Result<Json<UserDTO>, ResponseError> {
        let mut user = self.user_repo.find_by_id(params.id).await;
        user.state.update(State {
            current: EntityState::Deleted,
            previous: Some(user.state.previous.clone().unwrap_or(EntityState::Active)),
        });
        self.user_repo.delete(user.clone()).await;
        return Ok(Json(from_user_to_user_dto(user)));
    }
}
