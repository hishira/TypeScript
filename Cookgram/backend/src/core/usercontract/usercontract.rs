use std::any::Any;

use serde::{Deserialize, Serialize};
use time::serde::rfc3339;
use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::{
    entity::{entity::IdGenerator, Entity},
    metaobject::metaobject::MetaObject,
    state::{entitystate::EntityState, state::State},
};

use super::contractid::ContractId;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub enum AdditionalFieldKey {
    String,
    Number,
    Selection,
    Boolean,
    Location,
    MultiSelection,
}
#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub enum AdditionalFieldValue {
    Text(String),
    Number(f32),
    Selection(String),
    Boolean(bool),
    Location((f32, f32)),
    MultiSelection(Vec<String>),
}

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct AdditionalField {
    pub key: AdditionalFieldKey,
    pub value: AdditionalFieldValue,
    pub description: Option<String>,
}
#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Contract {
    pub id: ContractId,
    pub owner_id: Uuid,
    pub user_id: Uuid,
    pub salary: f32,
    pub terms: String,
    pub notes: Option<String>,
    pub contract_start_datetime: Option<OffsetDateTime>,
    pub contract_end_datetime: Option<OffsetDateTime>,
    #[serde(with = "rfc3339")]
    pub work_star_date: OffsetDateTime,
    pub meta: MetaObject,
    pub state: State<EntityState>,
    pub additional_fields: Option<Vec<AdditionalField>>,
}

impl Entity for Contract {
    fn generate_id() -> impl IdGenerator {
        ContractId::default()
    }
}
#[cfg(test)]
mod tests {
    use std::borrow::{Borrow, BorrowMut};

    use crate::core::state::entitystate::EntityState;

    use super::*;
    use serde_json;
    use time::macros::datetime;
    use uuid::Uuid;

    #[test]
    fn test_serialization() {
        let id = ContractId::generate_id();
        let owner_id = Uuid::new_v4();
        let user_id = Uuid::new_v4();
        let start = Some(datetime!(2024-01-01 00:00:00 +00:00));
        let end = Some(datetime!(2024-12-31 23:59:59 +00:00));
        let work_start = datetime!(2024-06-01 08:00:00 +00:00);
        let state = State {
            current: EntityState::Active,
            previous: Some(EntityState::Suspend),
        };
        let contract = Contract {
            id: id.clone(),
            owner_id,
            user_id,
            salary: 50000.0,
            terms: "Standard employment contract".to_string(),
            notes: Some("Initial agreement".to_string()),
            contract_start_datetime: start,
            contract_end_datetime: end,
            work_star_date: work_start,
            meta: MetaObject::new(),
            state,
            additional_fields: None,
        };

        // Serializacja do JSON
        let json = serde_json::to_string(&contract).expect("Failed to serialize");

        // Sprawdzenie, czy JSON zawiera prawidłowe dane
        let expected_json = format!(
            r#"{{"id":"{}","owner_id":"{}","user_id":"{}","salary":50000.0,"terms":"Standard employment contract","notes":"Initial agreement","contract_start_datetime":"2024-01-01T00:00:00Z","contract_end_datetime":"2024-12-31T23:59:59Z","work_star_date":"2024-06-01T08:00:00Z","state":{{"current":"Active","previous":"Suspend"}}}}"#,
            id.get_id(),
            owner_id,
            user_id
        );
        assert_eq!(json, expected_json);
    }

    // #[test]
    // fn test_deserialization() {
    //     let id = Uuid::new_v4();
    //     let owner_id = Uuid::new_v4();
    //     let user_id = Uuid::new_v4();
    //     let json = format!(
    //         r#"{{"id":"{}","owner_id":"{}","user_id":"{}","salary":50000.0,"terms":"Standard employment contract","notes":"Initial agreement","contract_start_datetime":"2024-01-01T00:00:00Z","contract_end_datetime":"2024-12-31T23:59:59Z","work_star_date":"2024-06-01T08:00:00Z","created_at":"2023-12-01T12:00:00Z","updated_at":"2023-12-15T12:00:00Z","state":{{"current":"Active","previous":"Suspend"}}}}"#,
    //         id, owner_id, user_id
    //     );

    //     // Deserializacja z JSON
    //     let deserialized: Contract = serde_json::from_str(&json).expect("Failed to deserialize");

    //     let expected = Contract {
    //         id,
    //         owner_id,
    //         user_id,
    //         salary: 50000.0,
    //         terms: "Standard employment contract".to_string(),
    //         notes: Some("Initial agreement".to_string()),
    //         contract_start_datetime: Some(datetime!(2024-01-01 00:00:00 +00:00)),
    //         contract_end_datetime: Some(datetime!(2024-12-31 23:59:59 +00:00)),
    //         work_star_date: datetime!(2024-06-01 08:00:00 +00:00),
    //         created_at: datetime!(2023-12-01 12:00:00 +00:00),
    //         updated_at: datetime!(2023-12-15 12:00:00 +00:00),
    //         state: State {
    //             current: EntityState::Active,
    //             previous: Some(EntityState::Suspend),
    //         },
    //     };
    //     assert_eq!(deserialized, expected);
    // }

    // #[test]
    // fn test_round_trip() {
    //     let id = Uuid::new_v4();
    //     let owner_id = Uuid::new_v4();
    //     let user_id = Uuid::new_v4();
    //     let start = Some(datetime!(2024-01-01 00:00:00 +00:00));
    //     let end = Some(datetime!(2024-12-31 23:59:59 +00:00));
    //     let work_start = datetime!(2024-06-01 08:00:00 +00:00);
    //     let created_at = datetime!(2023-12-01 12:00:00 +00:00);
    //     let updated_at = datetime!(2023-12-15 12:00:00 +00:00);
    //     let state = State {
    //         current: EntityState::Active,
    //         previous: Some(EntityState::Suspend),
    //     };
    //     let contract = Contract {
    //         id,
    //         owner_id,
    //         user_id,
    //         salary: 50000.0,
    //         terms: "Standard employment contract".to_string(),
    //         notes: Some("Initial agreement".to_string()),
    //         contract_start_datetime: start,
    //         contract_end_datetime: end,
    //         work_star_date: work_start,
    //         created_at,
    //         updated_at,
    //         state,
    //     };

    //     // Serializacja do JSON
    //     let json = serde_json::to_string(&contract).expect("Failed to serialize");

    //     // Deserializacja z JSON
    //     let deserialized: Contract = serde_json::from_str(&json).expect("Failed to deserialize");

    //     assert_eq!(contract, deserialized);
    // }
}
