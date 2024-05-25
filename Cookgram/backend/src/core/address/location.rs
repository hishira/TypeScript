use crate::core::valueObject::value_object::ValueObject;

pub struct Location {
    pub latitude: f32,
    pub longitude: f32,
}

impl ValueObject for Location{}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_location_creation() {
        let location = Location { latitude: 45.0, longitude: 90.0 };
        assert_eq!(location.latitude, 45.0);
        assert_eq!(location.longitude, 90.0);
    }

}