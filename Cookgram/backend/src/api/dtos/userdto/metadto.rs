use crate::core::meta::meta::Meta;
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use uuid::Uuid;

#[derive(PartialEq, Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MetaDto {
    pub id: Uuid,
    #[serde(with = "time::serde::rfc3339")]
    pub create_date: OffsetDateTime,
    #[serde(with = "time::serde::rfc3339")]
    pub edit_date: OffsetDateTime,
}

pub fn convert_meta_to_meta_dto(meta: Meta) -> MetaDto {
    MetaDto {
        id: meta.id.get_id(),
        create_date: meta.create_date,
        edit_date: meta.edit_date,
    }
}
