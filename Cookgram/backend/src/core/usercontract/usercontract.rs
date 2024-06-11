use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use uuid::Uuid;
use time::serde::rfc3339;

use crate::core::{entity::Entity, state::state::State};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct UserContract {
    pub id: Uuid,
    pub salary: f32,
    #[serde(with = "rfc3339")]
    pub contract_start_datetime: OffsetDateTime,
    #[serde(with = "rfc3339")]
    pub contract_end_datetime: OffsetDateTime,
    pub state: State,
}

impl Entity for UserContract {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}
#[cfg(test)]
mod tests {
    use crate::core::state::entitystate::EntityState;

    use super::*;
    use serde_json;
    use time::OffsetDateTime;
    use uuid::Uuid;
    use time::macros::datetime;

    #[test]
    fn test_serialization() {
        let id = Uuid::new_v4();
        let start = datetime!(2024-01-01 00:00:00 +00:00);
        let end = datetime!(2024-12-31 23:59:59 +00:00);
        let state = State {
            current: EntityState::Active,
            previus: Some(EntityState::Suspend),
        };
        let contract = UserContract {
            id,
            salary: 50000.0,
            contract_start_datetime: start,
            contract_end_datetime: end,
            state,
        };

        // Serializacja do JSON
        let json = serde_json::to_string(&contract).expect("Failed to serialize");

        // Sprawdzenie, czy JSON zawiera prawidłowe dane
        let expected_json = format!(
            r#"{{"id":"{}","salary":50000.0,"contract_start_datetime":"2024-01-01T00:00:00Z","contract_end_datetime":"2024-12-31T23:59:59Z","state":{{"current":"Active","previus":"Suspend"}}}}"#,
            id
        );
        assert_eq!(json, expected_json);
    }

    #[test]
    fn test_deserialization() {
        let id = Uuid::new_v4();
        let json = format!(
            r#"{{"id":"{}","salary":50000.0,"contract_start_datetime":"2024-01-01T00:00:00Z","contract_end_datetime":"2024-12-31T23:59:59Z","state":{{"current":"Active","previus":"Suspend"}}}}"#,
            id
        );

        // Deserializacja z JSON
        let deserialized: UserContract = serde_json::from_str(&json).expect("Failed to deserialize");

        let expected = UserContract {
            id,
            salary: 50000.0,
            contract_start_datetime: datetime!(2024-01-01 00:00:00 +00:00),
            contract_end_datetime: datetime!(2024-12-31 23:59:59 +00:00),
            state: State {
                current: EntityState::Active,
                previus: Some(EntityState::Suspend),
            },
        };
        assert_eq!(deserialized, expected);
    }

    #[test]
    fn test_round_trip() {
        let id = Uuid::new_v4();
        let start = datetime!(2024-01-01 00:00:00 +00:00);
        let end = datetime!(2024-12-31 23:59:59 +00:00);
        let state = State {
            current: EntityState::Active,
            previus: Some(EntityState::Suspend),
        };
        let contract = UserContract {
            id,
            salary: 50000.0,
            contract_start_datetime: start,
            contract_end_datetime: end,
            state,
        };

        // Serializacja do JSON
        let json = serde_json::to_string(&contract).expect("Failed to serialize");

        // Deserializacja z JSON
        let deserialized: UserContract = serde_json::from_str(&json).expect("Failed to deserialize");

        assert_eq!(contract, deserialized);
    }

    #[test]
    fn test_manual_dates() {
        let id = Uuid::new_v4();
        let start = datetime!(2024-01-01 00:00:00 +00:00);
        let end = datetime!(2024-12-31 23:59:59 +00:00);
        let state = State {
            current: EntityState::Active,
            previus: Some(EntityState::Suspend),
        };
        let contract = UserContract {
            id,
            salary: 50000.0,
            contract_start_datetime: start,
            contract_end_datetime: end,
            state,
        };

        // Serializacja do JSON
        let json = serde_json::to_string(&contract).expect("Failed to serialize");
        let expected_json = format!(
            r#"{{"id":"{}","salary":50000.0,"contract_start_datetime":"2024-01-01T00:00:00Z","contract_end_datetime":"2024-12-31T23:59:59Z","state":{{"current":"Active","previus":"Suspend"}}}}"#,
            id
        );
        assert_eq!(json, expected_json);

        // Deserializacja z JSON
        let deserialized: UserContract = serde_json::from_str(&expected_json).expect("Failed to deserialize");
        assert_eq!(contract, deserialized);
    }
}
