use time::OffsetDateTime;

use crate::core::entity::Entity;

#[derive(Clone)]
pub enum EventType {
    Create,
    Delete,
    Update,
}
#[derive(Clone)]
pub struct Event {
    pub id: uuid::Uuid,
    pub create_date: time::Date,
    pub event_type: EventType,
    pub related_entity: uuid::Uuid,
    pub completed: bool,
}

impl Entity for Event{
    fn generate_id() -> uuid::Uuid {
        uuid::Uuid::new_v4()
    }
}

impl Event {
    pub fn new(
        id: Option<uuid::Uuid>,
        event: Option<EventType>,
        related_entity_id: uuid::Uuid,
        completed: bool,
    ) -> Self {
        let current_id = match id {
            Some(id) => id,
            None => Event::generate_id(),
        };
        let event_type = match event {
            Some(event) => event,
            None => EventType::Create,
        };
        Self {
            id: current_id,
            event_type,
            create_date: OffsetDateTime::now_utc().date(),
            related_entity: related_entity_id,
            completed,
        }
    }
}
