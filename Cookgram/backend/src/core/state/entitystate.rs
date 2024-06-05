use core::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};
use sqlx::{
    encode::IsNull,
    postgres::{PgArgumentBuffer, PgTypeInfo},
    Encode, Postgres, Type,
};

#[derive(Debug, Clone, PartialEq)]
pub enum EntityState {
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
            EntityState::Active => "Active",
            EntityState::Suspend => "Suspend",
            EntityState::Frozen => "Frozen",
            EntityState::Retired => "Retired",
            EntityState::Deleted => "Deleted",
        };
        Encode::<Postgres>::encode(value, buf)
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
