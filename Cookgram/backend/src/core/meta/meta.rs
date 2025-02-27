use serde::{Deserialize, Serialize, Serializer};
use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::entity::entity::IdGenerator;
use crate::core::entity::Entity;

use super::metaid::MetaId;

#[derive(PartialEq, Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Meta {
    pub id: MetaId,
    #[serde(with = "time::serde::rfc3339")]
    pub create_date: OffsetDateTime,
    #[serde(with = "time::serde::rfc3339")]
    pub edit_date: OffsetDateTime,
}

impl Meta {
    pub fn new() -> Self {
        Self {
            id: MetaId::default(),
            create_date: OffsetDateTime::now_utc(),
            edit_date: OffsetDateTime::now_utc(),
        }
    }

    pub fn based_on_edi_date(id: Uuid, edit_date: OffsetDateTime) -> Self {
        Self {
            id: MetaId::from_id(id),
            create_date: OffsetDateTime::now_utc(),
            edit_date,
        }
    }

    pub fn meta_based_on_id(id: Uuid) -> Self {
        Self {
            id: MetaId::from_id(id),
            create_date: OffsetDateTime::now_utc(),
            edit_date: OffsetDateTime::now_utc(),
        }
    }

    pub fn update_edit_date(&mut self) {
        self.edit_date = OffsetDateTime::now_utc();
    }
}


impl Entity for Meta {
    fn generate_id() -> impl IdGenerator {
        MetaId::default()
    }
}

#[cfg(test)]
mod tests {
    use serde_test::{assert_tokens, Token};
    use time::{Date, Month};

    use super::*;
    struct MockOffsetDateTime;

    impl MockOffsetDateTime {
        fn now_utc() -> Self {
            MockOffsetDateTime
        }

        fn date(&self) -> Date {
            Date::from_iso_week_date(2024, 10, time::Weekday::Monday).expect("Invalid date")
        }
    }

    #[test]
    fn test_meta_new() {
        let offset_date_time = MockOffsetDateTime::now_utc();

        let meta: Meta = Meta {
            id: MetaId::default(),
            create_date: OffsetDateTime::now_utc(),
            edit_date: OffsetDateTime::now_utc(),
        };

        assert_eq!(meta.create_date.year(), 2024);
        assert_eq!(meta.create_date.month(), Month::March);
        assert_eq!(meta.create_date.day(), 4); // Day is set to 1 for example
        assert_eq!(meta.edit_date, meta.create_date);
    }

    // TODO: Add deserializer
    #[test]
    fn test_serialization() {
        let offset_date_time = MockOffsetDateTime::now_utc();

        let meta = Meta {
            id: MetaId::default(),
            create_date: OffsetDateTime::now_utc(),
            edit_date: OffsetDateTime::now_utc(),
        };

        assert_tokens(
            &meta,
            &[
                Token::Struct {
                    name: "Meta",
                    len: 2,
                },
                Token::String("create_date"),
                Token::String("2024-03-04"),
                Token::String("edit_date"),
                Token::String("2024-03-04"),
                Token::StructEnd,
            ],
        );
    }
}
