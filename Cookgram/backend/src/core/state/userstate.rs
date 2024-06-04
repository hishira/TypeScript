use core::fmt;
use std::str::FromStr;

use serde::{Deserialize, Serialize};

#[derive(Debug)]
pub enum UserState {
    Active,
    Suspend,
    Frozen,
    Retired,
    Deleted,
}

#[derive(Debug, PartialEq, Eq)]
pub struct ParseFromStringUserStateError;

impl fmt::Display for ParseFromStringUserStateError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Problem with UserState conversion")
        // ...
    }
}

impl FromStr for UserState {
    type Err = ParseFromStringUserStateError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Active" => Ok(UserState::Active),
            "Suspend" => Ok(UserState::Suspend),
            "Frozen" => Ok(UserState::Frozen),
            "Retired" => Ok(UserState::Retired),
            "Deleted" => Ok(UserState::Deleted),
            _ => Err(ParseFromStringUserStateError),
        }
    }
}
impl Serialize for UserState {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            UserState::Active => serializer.serialize_str("Active"),
            UserState::Suspend => serializer.serialize_str("Suspend"),
            UserState::Frozen => serializer.serialize_str("Frozen"),
            UserState::Retired => serializer.serialize_str("Retired"),
            UserState::Deleted => serializer.serialize_str("Deleted"),
        }
    }
}

impl<'de> Deserialize<'de> for UserState {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s_string = String::deserialize(deserializer);
        match s_string {
            Ok(user_state) => match UserState::from_str(user_state.as_str()) {
                Ok(state) => Ok(state),
                Err(error) => Err(serde::de::Error::custom(error)),
            },
            Err(error) => Err(error),
        }
    }
}
