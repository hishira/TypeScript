use std::{any, borrow::Borrow};

use crate::{
    api::{
        dtos::{
            addressdto::createaddressdto::CreateAddressDto,
            roledto::roledto::RoleDto,
            userdto::{
                operationuserdto::{CreateUserDto, UpdateUserDto},
                userdto::UserDtos,
            },
        },
        utils::password_worker::password_worker::PasswordWorkerError,
    },
    core::{
        meta::meta::Meta,
        role::role::Roles,
        state::state::State,
        user::{
            contact::Contacts, credentials::Credentials, personalinformation::{Gender, PersonalInformation},
            user::User, userid::UserId,
        },
    },
};
use sqlx::Row;
use sqlx::{postgres::PgRow, Error};
use time::OffsetDateTime;

pub struct UserUtils {}

impl UserUtils {
    async fn create_user_handle(user: CreateUserDto) -> Result<User, PasswordWorkerError> {
        let personal_information =PersonalInformation::create_based_on_user_dto(UserDtos::Create(user.clone()));
        let role = user.role;
        let credentials =
            Credentials::new_with_hashed_password_using_creditional_dto(user.creditionals).await?;
        Ok(User::new(
            None,
            personal_information,
            credentials,
            role,
            None,
            user.address
                .map(CreateAddressDto::build_address_based_on_create_dto),
        ))
    }

    async fn update_user_handle(
        user_to_edit: Option<User>,
        user: UpdateUserDto,
    ) -> Result<User, PasswordWorkerError> {
        let mut user_from_db = user_to_edit.unwrap();
        user_from_db.meta.update_edit_date();
        let new_credentials: Credentials = match user.password {
            Some(password) => {
                Credentials::new_with_hashed_password(user.username, password, false).await?
            }
            None => Credentials::new(user.username, user_from_db.credentials.password, false),
        };
        let personal_information: PersonalInformation = PersonalInformation {
            first_name: user.personal_information.first_name,
            last_name: user.personal_information.last_name,
            brithday: user.personal_information.brithday,
            email: user
                .personal_information
                .email
                .or(user_from_db.personal_information.email),
            gender: None,
            contacts: Some(Contacts::empty()),
        };
        Ok(User::new(
            Some(user_from_db.id.get_id()),
            personal_information,
            new_credentials,
            Some(user.role.unwrap_or(user_from_db.role)),
            Some(user_from_db.meta),
            None,
        ))
    }

    pub async fn get_from_dto(
        user_dto: UserDtos,
        user_to_edit: Option<User>,
    ) -> Result<User, PasswordWorkerError> {
        match user_dto {
            UserDtos::Create(user) => Self::create_user_handle(user).await,
            UserDtos::Update(user) => Self::update_user_handle(user_to_edit, user).await,
            UserDtos::Delete(_) => todo!(),
        }
    }

    pub fn get_from_row(pg_row: PgRow) -> User {
        User {
            id: UserId::from_id(pg_row.get("id")),
            personal_information: PersonalInformation::prepare_personal_information_from_row(&pg_row),
            credentials: Credentials::new(
                pg_row
                    .try_get("username")
                    .unwrap_or("Not found ".to_string()),
                pg_row
                    .try_get("password")
                    .unwrap_or("Not found ".to_string()),
                pg_row.try_get("passowrd_is_temporary").unwrap_or(false),
            ),
            meta: Meta::meta_based_on_id(pg_row.get("meta_id")), //Meta::new(), //TODO: Inner join table to retrieve,
            role: Self::retrive_role_from_row(&pg_row).unwrap(),
            address: None,
            state: State {
                current: pg_row.get("current_state"),
                previous: pg_row.get("previous_state"),
            },
        }
    }

    pub fn get_from_row_ref(pg_row: &PgRow) -> User {
        User {
            id: UserId::from_id(pg_row.get("id")),
            personal_information: PersonalInformation::prepare_personal_information_from_row(&pg_row),
            credentials: Credentials::new(
                pg_row
                    .try_get("username")
                    .unwrap_or("Not found ".to_string()),
                pg_row
                    .try_get("password")
                    .unwrap_or("Not found ".to_string()),
                pg_row.try_get("passowrd_is_temporary").unwrap_or(false),
            ),
            meta: Meta::meta_based_on_id(pg_row.get("meta_id")), //Meta::new(), //TODO: Inner join table to retrieve,
            role: Self::retrive_role_from_row(&pg_row).unwrap(),
            address: None,
            state: State {
                current: pg_row.get("current_state"),
                previous: pg_row.get("previous_state"),
            },
        }
    }

    // fn prepare_personal_information(pg_row: &PgRow) -> PersonalInformation {
       
    // }
    fn retrive_role_from_row(pg_row: &PgRow) -> Result<Roles, sqlx::Error> {
        let role: Result<RoleDto, sqlx::Error> = pg_row.try_get("role");
        match role {
            Ok(res) => Ok(res.map_to_roles()),
            Err(error) => {
                tracing::error!("Not recognized roles");
                Err(error)
            }
        }
    }
}
