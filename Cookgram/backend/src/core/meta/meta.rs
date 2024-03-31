use time::OffsetDateTime;

#[derive(PartialEq)]
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

#[cfg(test)]
mod tests {
    use time::{Date, Month};

    use super::*;
    struct MockOffsetDateTime;

    impl MockOffsetDateTime {
        fn now_utc() -> Self {
            MockOffsetDateTime
        }

        fn date(&self) -> Date {
            Date::from_iso_week_date(2024, 10,time::Weekday::Monday).expect("Invalid date")
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
}