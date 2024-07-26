use axum::Json;
use sqlx::postgres::{PgQueryResult, PgRow};
use sqlx::{Pool, Postgres, QueryBuilder, Row};
use time::OffsetDateTime;
use uuid::Uuid;

use crate::api::daos::userdao::UserDAO;
use crate::api::dtos::addressdto::createaddressdto::CreateAddressDto;
use crate::api::dtos::roledto::roledto::RoleDto;
use crate::api::dtos::userdto::userdto::{CreateUserDto, UpdateUserDto, UserFilterOption};
use crate::api::dtos::userdto::userlistdto::UserListDto;
use crate::api::errors::responseerror::ResponseError;
use crate::api::repositories::repositories::Repository;
use crate::api::repositories::userrepositories::UserRepositories;
use crate::api::utils::password_worker::password_worker::{PasswordWorker, PasswordWorkerError};
use crate::api::utils::user::user_utils::UserUtils;
use crate::core::role::role::Roles;
use crate::core::state::state::State;
use crate::core::user::contact::Contacts;
use crate::core::user::credentials::Credentials;
use crate::core::user::personalinformation::PersonalInformation;
use crate::core::user::userid::UserId;
use crate::{
    api::dtos::userdto::userdto::UserDtos,
    core::{meta::meta::Meta, user::user::User},
};

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

    pub async fn get_users(
        &self,
        params: UserFilterOption,
    ) -> Result<Vec<UserListDto>, sqlx::Error> {
        self.user_dao.user_list(params).await
    }

    pub async fn create_managed(
        user: User,
        repo: impl Repository<User, UserFilterOption, sqlx::Error>,
    ) -> User {
        todo!()
    }

    pub async fn create_user(&self, params: CreateUserDto) -> Result<Json<User>, ResponseError> {
        let user_tmp = UserUtils::get_user_from_dto(UserDtos::Create(params), None).await;
        match user_tmp {
            Ok(user) => {
                let user = self.user_repo.create(user).await;
                Ok(Json(user))
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
    ) -> Result<Json<bool>, ResponseError> {
        let user = UserUtils::get_user_from_dto(UserDtos::Create(params), None).await?;
        let ids_touples = (owner_id, user.id.get_id());
        self.user_repo.create(user).await;
        let result = self.user_dao.create_user_connection(ids_touples).await;
        match result {
            Ok(_) => Ok(Json(true)),
            Err(error) => {
                tracing::error!("User cannot be added {}", error);
                return Ok(Json(false));
            }
        }
    }

    pub async fn get_managed_users(&self, filter_option: UserFilterOption) -> Vec<User> {
        self.user_repo.find(filter_option).await.unwrap_or(vec![])
    }

    pub async fn get_current_user(&self, user_id: Uuid) -> User {
        self.user_repo.find_by_id(user_id).await
    }

    pub async fn add_user_address(&self, params: CreateAddressDto) -> User {
        let user = self.user_repo.find_by_id(params.user_id).await;
        self.user_repo
            .update(User::create_base_on_user_and_address(
                user,
                CreateAddressDto::build_address_based_on_create_dto(params),
            ))
            .await
    }

    pub async fn update_user(
        &self,
        params: UpdateUserDto,
        user_id: Uuid,
    ) -> Result<User, ResponseError> {
        let user = self.user_repo.find_by_id(user_id).await;
        let updated_user =
            UserUtils::get_user_from_dto(UserDtos::Update(params), Some(user)).await?;
        Ok(self.user_repo.update(updated_user.clone()).await)
    }

    pub async fn user_list()-> Result<Json<Vec<UserListDto>>, ResponseError> {
        todo!()
    }
}
