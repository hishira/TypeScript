pub struct AddressQuery{
}

impl AddressQuery{
    const CREATE_QUERY: &str = "INSERT INTO ADDRESS(id, address, house, door, city, country, lat, long, postal_code )";

}