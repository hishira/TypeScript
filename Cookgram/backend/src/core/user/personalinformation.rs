use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub enum Gender {
    Man,
    Woman,
}
#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct PersonalInformation {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub brithday: OffsetDateTime,
    pub email: Option<String>,
    pub gender: Option<Gender>
}
