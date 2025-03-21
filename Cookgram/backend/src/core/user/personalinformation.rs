
use sqlx::postgres::PgRow;
use sqlx::Row;
use time::OffsetDateTime;

use crate::api::dtos::userdto::userdto::UserDtos;

use super::contact::Contacts;

#[derive(PartialEq, Debug, Clone, sqlx::Type)]
#[sqlx(type_name = "Gender")]
pub enum Gender {
    Man,
    Woman,
    None,
}

#[derive(PartialEq, Debug, Clone)]
pub struct PersonalInformation {
    pub first_name: String,
    pub last_name: String,
    pub brithday: OffsetDateTime,
    pub email: Option<String>,
    pub gender: Option<Gender>,
    pub contacts: Option<Contacts>,
}

impl PersonalInformation {
    pub fn create_based_on_user_dto(user_dto: UserDtos) -> Self {
        match user_dto {
            UserDtos::Create(create_user_dto) => Self {
                first_name: create_user_dto.personal_information.first_name,
                last_name: create_user_dto.personal_information.last_name,
                brithday: create_user_dto.personal_information.brithday,
                email: create_user_dto.personal_information.email,
                gender: None,
                contacts: Some(Contacts::empty()),
            },
            UserDtos::Update(update_user_dto) => Self {
                first_name: update_user_dto.personal_information.first_name,
                last_name: update_user_dto.personal_information.last_name,
                brithday: update_user_dto.personal_information.brithday,
                email: update_user_dto.personal_information.email,
                gender: None,
                contacts: Some(Contacts::empty()),
            },
            UserDtos::Delete(_) => todo!(),
        }
    }

    pub fn prepare_personal_information_from_row(pg_row: &PgRow) -> Self {
        Self {
            first_name: pg_row.try_get("first_name").unwrap_or("NULL".to_string()),
            last_name: pg_row.try_get("last_name").unwrap_or("NULL".to_string()),
            email: pg_row
                .try_get("email")
                .unwrap_or(Some("Not found ".to_string())),
            brithday: OffsetDateTime::now_utc(),
            gender: Some(pg_row.try_get("gender").unwrap_or(Gender::None)),
            contacts: Some(Contacts::empty()),
        }
    }
}
