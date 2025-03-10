use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::entity::entity::IdGenerator;
use crate::core::entity::Entity;

use super::metaid::MetaId;

#[derive(PartialEq, Debug, Clone)]
pub struct Meta {
    pub id: MetaId,
    pub create_date: OffsetDateTime,
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
    use time::{Date, Month};

    use super::*;
    #[test]
    fn test_meta_new() {

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
}
