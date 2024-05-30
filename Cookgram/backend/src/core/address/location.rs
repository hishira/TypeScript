use serde::{Deserialize, Serialize};

use crate::core::valueObject::value_object::ValueObject;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize, Copy)]
pub struct Location {
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
}

impl ValueObject for Location {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_location_creation_with_values() {
        let location = Location {
            latitude: Some(45.0),
            longitude: Some(90.0),
        };

        assert_eq!(location.latitude, Some(45.0));
        assert_eq!(location.longitude, Some(90.0));
    }

    #[test]
    fn test_location_creation_without_values() {
        let location = Location {
            latitude: None,
            longitude: None,
        };

        assert_eq!(location.latitude, None);
        assert_eq!(location.longitude, None);
    }

    #[test]
    fn test_location_creation_with_partial_values() {
        let location_with_latitude = Location {
            latitude: Some(45.0),
            longitude: None,
        };
        let location_with_longitude = Location {
            latitude: None,
            longitude: Some(90.0),
        };

        assert_eq!(location_with_latitude.latitude, Some(45.0));
        assert_eq!(location_with_latitude.longitude, None);

        assert_eq!(location_with_longitude.latitude, None);
        assert_eq!(location_with_longitude.longitude, Some(90.0));
    }
}
