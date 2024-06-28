use time::OffsetDateTime;
use uuid::Uuid;

pub enum Species {
    Dog,
    Cat,
    Parrot,
    Mouse,
    Hamster,

}
pub struct Animal{
    pub id: Uuid,
    pub name: String,
    pub species: Species,
    pub breed: Option<String>,
    pub age: u8,
    pub arrival_date: Option<OffsetDateTime>,
    pub adoption_date: Option<OffsetDateTime>,
    pub adopted: bool,
}