use serde::ser::SerializeStruct;
use serde::{Deserialize, Serialize, Serializer};
use time::OffsetDateTime;

#[derive(PartialEq, Debug, Clone, Deserialize)]
pub struct Meta {
    pub create_date: time::Date,
    pub edit_date: time::Date,
}

impl Meta {
    pub fn new() -> Self {
        Self {
            create_date: OffsetDateTime::now_utc().date(),
            edit_date: OffsetDateTime::now_utc().date(),
        }
    }
}

impl Serialize for Meta {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("Meta", 2)?;
        state.serialize_field("create_date", &self.create_date.to_string());
        state.serialize_field("edit_date", &self.create_date.to_string());

        state.end()
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

        let meta = Meta {
            create_date: offset_date_time.date(),
            edit_date: offset_date_time.date(),
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
            create_date: offset_date_time.date(),
            edit_date: offset_date_time.date(),
        };

        assert_tokens(&meta,&[
            Token::Struct { name: "Meta", len:2 },
            Token::String("create_date"),
            Token::String("2024-03-04"),
            Token::String("edit_date"),
            Token::String("2024-03-04"),
            Token::StructEnd,
        ],);
    }
}
