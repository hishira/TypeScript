use serde::Deserialize;
use time::OffsetDateTime;
use uuid::Uuid;
use validator::Validate;

#[derive(Debug, Validate, Deserialize)]
pub struct CreateContractDto {
    #[serde(rename = "ownerId")]
    pub owner_id: Option<Uuid>,
    #[serde(rename = "customerId")]
    pub customer_id: Uuid,
    pub salary: Option<f32>,
    #[serde(rename = "contractStartTime")]
    pub contract_start_time: OffsetDateTime,
    #[serde(rename = "contractEndTime")]
    pub contract_end_time: Option<OffsetDateTime>,
}
