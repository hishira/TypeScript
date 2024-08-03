use crate::{
    api::{
        dtos::{roledto::roledto::RoleDto, userdto::userdto::UserDtos},
        utils::password_worker::password_worker::PasswordWorkerError,
    },
    core::{
        meta::meta::Meta,
        role::role::Roles,
        state::state::State,
        user::{
            contact::Contacts, credentials::Credentials, personalinformation::PersonalInformation,
            user::User, userid::UserId,
        },
    },
};
use sqlx::postgres::PgRow;
use sqlx::Row;
use time::OffsetDateTime;

pub struct UserUtils {}

impl UserUtils {
    pub async fn get_from_dto(
        user_dto: UserDtos,
        user_to_edit: Option<User>,
    ) -> Result<User, PasswordWorkerError> {
        match user_dto {
            UserDtos::Create(user) => {
                let role = user.role;
                // let hash = pass_worker.hash(user.password.clone()).await.unwrap();
                let credentials = Credentials::new_with_hashed_password(
                    user.username,
                    user.password,
                    user.password_is_temporary.unwrap_or(false),
                )
                .await?;
                let personal_information = PersonalInformation {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    brithday: OffsetDateTime::now_utc(), //TODO: Fix
                    email: Some(user.email),
                    gender: None,
                    contacts: Some(Contacts::empty()),
                };
                Ok(User::new(
                    None,
                    personal_information,
                    credentials,
                    role,
                    None,
                ))
            }
            UserDtos::Update(user) => {
                let mut user_from_db = user_to_edit.unwrap();
                user_from_db.meta.update_edit_date();
                let new_credentials: Credentials = match user.password {
                    Some(password) => {
                        Credentials::new_with_hashed_password(user.username, password, false)
                            .await?
                    }
                    None => {
                        Credentials::new(user.username, user_from_db.credentials.password, false)
                    }
                };
                let personal_information = PersonalInformation {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    brithday: OffsetDateTime::now_utc(), //TODO: Fix
                    email: user.email.or(user_from_db.personal_information.email),
                    gender: None,
                    contacts: Some(Contacts::empty()),
                };
                Ok(User::new(
                    Some(user_from_db.id.get_id()),
                    personal_information,
                    new_credentials,
                    Some(user.role.unwrap_or(user_from_db.role)),
                    Some(user_from_db.meta),
                ))
            }
            UserDtos::Delete(_) => todo!(),
        }
    }

    pub fn get_from_row(pg_row: PgRow) -> User {
        User {
            id: UserId::from_id(pg_row.get("id")),
            personal_information: Self::prepare_personal_information(&pg_row),
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

    fn prepare_personal_information(pg_row: &PgRow) -> PersonalInformation {
        PersonalInformation {
            first_name: pg_row
                .try_get("first_name")
                .unwrap_or(Some("NULL".to_string())),
            last_name: pg_row
                .try_get("last_name")
                .unwrap_or(Some("NULL".to_string())),
            email: pg_row
                .try_get("email")
                .unwrap_or(Some("Not found ".to_string())),
            brithday: OffsetDateTime::now_utc(), // TODO: Fix
            gender: None,
            contacts: Some(Contacts::empty()),
        }
    }
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
