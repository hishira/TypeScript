use core::fmt;
use std::str::FromStr;
use std::error::Error;

use serde::{Deserialize, Serialize};
use sqlx::{
    encode::IsNull, postgres::{PgArgumentBuffer, PgTypeInfo, PgValueRef}, Decode, Encode, Postgres, Type
};

#[derive(Debug, Clone, PartialEq)]
pub enum EntityState {
    Draft,
    Active,
    Suspend,
    Frozen,
    Retired,
    Deleted,
}

impl Type<Postgres> for EntityState {
    fn type_info() -> PgTypeInfo {
        PgTypeInfo::with_name("State")
    }
}

impl<'q> Encode<'q, Postgres> for EntityState {
    fn encode_by_ref(&self, buf: &mut PgArgumentBuffer) -> IsNull {
        let value = match self {
            EntityState::Draft => "Draft",
            EntityState::Active => "Active",
            EntityState::Suspend => "Suspend",
            EntityState::Frozen => "Frozen",
            EntityState::Retired => "Retired",
            EntityState::Deleted => "Deleted",
        };
        Encode::<Postgres>::encode(value, buf)
    }
}

impl<'r> Decode<'r, Postgres> for EntityState {
    fn decode(value: PgValueRef<'r>) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let s = <&str as Decode<Postgres>>::decode(value).unwrap();
        match s {
            "Draft" => Ok(EntityState::Draft),
            "Active" => Ok(EntityState::Active),
            "Suspend" => Ok(EntityState::Suspend),
            "Frozen" => Ok(EntityState::Frozen),
            "Retired" => Ok(EntityState::Retired),
            "Deleted" => Ok(EntityState::Deleted),
            _ => Err(format!("Invalid state: {}", s).into()),
        }
    }
}

#[derive(Debug, PartialEq, Eq)]
pub struct ParseFromStringEntityStateError;

impl fmt::Display for ParseFromStringEntityStateError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Problem with EntityState conversion")
    }
}

impl FromStr for EntityState {
    type Err = ParseFromStringEntityStateError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Draft" => Ok(EntityState::Draft),
            "Active" => Ok(EntityState::Active),
            "Suspend" => Ok(EntityState::Suspend),
            "Frozen" => Ok(EntityState::Frozen),
            "Retired" => Ok(EntityState::Retired),
            "Deleted" => Ok(EntityState::Deleted),
            _ => Err(ParseFromStringEntityStateError),
        }
    }
}
impl Serialize for EntityState {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            EntityState::Draft => serializer.serialize_str("Draft"),
            EntityState::Active => serializer.serialize_str("Active"),
            EntityState::Suspend => serializer.serialize_str("Suspend"),
            EntityState::Frozen => serializer.serialize_str("Frozen"),
            EntityState::Retired => serializer.serialize_str("Retired"),
            EntityState::Deleted => serializer.serialize_str("Deleted"),
        }
    }
}

impl<'de> Deserialize<'de> for EntityState {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s_string = String::deserialize(deserializer);
        match s_string {
            Ok(user_state) => match EntityState::from_str(user_state.as_str()) {
                Ok(state) => Ok(state),
                Err(error) => Err(serde::de::Error::custom(error)),
            },
            Err(error) => Err(error),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::postgres::{PgArgumentBuffer, PgTypeInfo, Postgres};
    use sqlx::Encode;
    use serde_json::{json, Value};
    use std::str::FromStr;

    #[test]
    fn test_from_str() {
        assert_eq!(EntityState::from_str("Active"), Ok(EntityState::Active));
        assert_eq!(EntityState::from_str("Suspend"), Ok(EntityState::Suspend));
        assert_eq!(EntityState::from_str("Frozen"), Ok(EntityState::Frozen));
        assert_eq!(EntityState::from_str("Retired"), Ok(EntityState::Retired));
        assert_eq!(EntityState::from_str("Deleted"), Ok(EntityState::Deleted));
        assert!(EntityState::from_str("Unknown").is_err());
    }

    #[test]
    fn test_encode() {
        let mut buffer = PgArgumentBuffer::default();
        let state = EntityState::Active;
        let is_null = state.encode_by_ref(&mut buffer);
        let expected_encoded_value = "Active";
        let encoded_value = std::str::from_utf8(&buffer).unwrap();
        assert_eq!(encoded_value, expected_encoded_value);
    }

    #[test]
    fn test_serialize() {
        let state = EntityState::Active;
        let serialized = serde_json::to_string(&state).unwrap();
        assert_eq!(serialized, "\"Active\"");
    }

    #[test]
    fn test_deserialize() {
        let json_data = json!("Active");
        let state: EntityState = serde_json::from_value(json_data).unwrap();
        assert_eq!(state, EntityState::Active);

        let json_data = json!("Unknown");
        let state: Result<EntityState, _> = serde_json::from_value(json_data);
        assert!(state.is_err());
    }

    #[test]
    fn test_display() {
        let error = ParseFromStringEntityStateError;
        assert_eq!(format!("{}", error), "Problem with EntityState conversion");
    }
}
