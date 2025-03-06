use crate::{
    api::{
        dtos::{
            addressdto::createaddressdto::build_address_based_on_create_dto,
            roledto::roledto::{map_to_roles, RoleDto},
            userdto::{
                operationuserdto::{CreateUserDto, UpdateUserDto},
                personalinformationdto::PersolanInformationDTO,
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
            credentials::Credentials, personalinformation::PersonalInformation, user::User,
            userid::UserId,
        },
    },
};
use sqlx::Row;
use sqlx::{postgres::PgRow, Error};

pub struct UserUtils {}

impl UserUtils {
    async fn create_user_handle(user: CreateUserDto) -> Result<User, PasswordWorkerError> {
        let personal_information =
            PersonalInformation::create_based_on_user_dto(UserDtos::Create(user.clone()));
        let role = user.role.map(map_to_roles);
        let credentials =
            Credentials::new_with_hashed_password_using_creditional_dto(user.creditionals).await?;
        Ok(User::new(
            None,
            personal_information,
            credentials,
            role,
            None,
            user.address.map(build_address_based_on_create_dto),
        ))
    }

    async fn update_user_handle(
        user_to_edit: Option<User>,
        user: UpdateUserDto,
    ) -> Result<User, PasswordWorkerError> {
        let mut user_from_db = user_to_edit.unwrap();
        user_from_db.meta.update_edit_date();
        let new_credentials: Credentials = Self::prepare_credentials(&user, &user_from_db).await?;
        let current_role: Roles = user
            .role
            .clone()
            .map(map_to_roles)
            .clone()
            .unwrap_or(user_from_db.role);
        let update_email = user
            .personal_information
            .clone()
            .email
            .or(user_from_db.personal_information.email);
        let personal_info = PersolanInformationDTO {
            email: update_email,
            ..user.personal_information.clone()
        };
        let prepare_update_dto: UpdateUserDto = UpdateUserDto {
            personal_information: personal_info,
            ..user.clone()
        };

        let personal_information: PersonalInformation =
            PersonalInformation::create_based_on_user_dto(UserDtos::Update(prepare_update_dto));
        Ok(User::new(
            Some(user_from_db.id.get_id()),
            personal_information,
            new_credentials,
            Some(current_role),
            Some(user_from_db.meta),
            None,
        ))
    }

    async fn prepare_credentials(
        user: &UpdateUserDto,
        user_from_db: &User,
    ) -> Result<Credentials, PasswordWorkerError> {
        match user.creditionals.password.clone() {
            password => {
                Credentials::new_with_hashed_password(
                    user.creditionals.username.clone(),
                    password.clone(),
                    false,
                )
                .await
            }
            _ => Ok(Credentials::new(
                user.creditionals.username.clone(),
                user_from_db.credentials.password.clone(),
                false,
            )),
        }
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
            personal_information: PersonalInformation::prepare_personal_information_from_row(
                &pg_row,
            ),
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
            role: map_to_roles(Self::retrive_role_from_row(&pg_row).unwrap()),
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
            personal_information: PersonalInformation::prepare_personal_information_from_row(
                &pg_row,
            ),
            credentials: Credentials::new(
                pg_row
                    .try_get("username")
                    .unwrap_or("Not found ".to_string()),
                pg_row
                    .try_get("password")
                    .unwrap_or("Not found ".to_string()),
                pg_row.try_get("passowrd_is_temporary").unwrap_or(false),
            ),
            meta: Meta::meta_based_on_id(pg_row.get("meta_id")),
            role: map_to_roles(Self::retrive_role_from_row(&pg_row).unwrap()),
            address: None,
            state: State {
                current: pg_row.get("current_state"),
                previous: pg_row.get("previous_state"),
            },
        }
    }

    pub fn retrive_role_from_row(pg_row: &PgRow) -> Result<RoleDto, sqlx::Error> {
        let role: Result<RoleDto, sqlx::Error> = pg_row.try_get("role");
        match role {
            Ok(res) => Ok(res),
            Err(error) => {
                tracing::error!("Not recognized roles");
                Err(error)
            }
        }
    }
}
