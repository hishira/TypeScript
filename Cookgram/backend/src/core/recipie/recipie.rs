use uuid::Uuid;

use crate::core::{
    entity::Entity,
    meta::meta::{self, Meta},
};

#[derive(PartialEq)]
pub struct Recipie {
    pub id: Uuid,
    pub recipie: String,
    pub meta: Meta,
}

impl Entity for Recipie {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}

impl Recipie {
    pub fn new(id: Option<Uuid>, recipie: String) -> Self {
        match id {
            Some(id) => Self {
                id,
                recipie,
                meta: Meta::new(),
            },
            None => Self {
                id: Recipie::generate_id(),
                recipie,
                meta: Meta::new(),
            },
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_recipie_new_with_id() {
        let recipie_id = Uuid::new_v4();
        let recipie = Recipie::new(Some(recipie_id), "Test Recipie".to_string());

        assert_eq!(recipie.id, recipie_id);

        assert_eq!(recipie.recipie, "Test Recipie");

        assert_eq!(recipie.meta.create_date.year(), 2024);
        assert_eq!(recipie.meta.edit_date, recipie.meta.create_date);
    }

    #[test]
    fn test_recipie_new_without_id() {
        let recipie = Recipie::new(None, "Test Recipie".to_string());

        assert_ne!(recipie.id, Uuid::nil());

        assert_eq!(recipie.recipie, "Test Recipie");

        assert_eq!(recipie.meta.create_date.year(), 2024);
        assert_eq!(recipie.meta.edit_date, recipie.meta.create_date);
    }

    #[test]
    fn test_generate_id() {
        let id1 = Recipie::generate_id();
        let id2 = Recipie::generate_id();

        assert_ne!(id1, id2);
    }
}
