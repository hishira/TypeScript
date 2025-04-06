use crate::core::user::personalinformation::Gender;
use serde::{Deserialize, Serialize};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize, sqlx::Type)]
pub enum GenderDTO {
    Man,
    Woman,
    None,
}

pub fn convert_gender_to_gender_dto(gender: Gender) -> GenderDTO {
    match gender {
        Gender::Man => GenderDTO::Man,
        Gender::Woman => GenderDTO::Woman,
        Gender::None => GenderDTO::None,
    }
}
