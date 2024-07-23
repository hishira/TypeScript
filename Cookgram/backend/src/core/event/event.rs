use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

use crate::core::entity::{entity::IdGenerator, Entity};

use super::eventId::EventId;

#[derive(Clone, Serialize, Deserialize)]
pub enum EventEntity {
    User,
    Notification,
    Ticket,
    Company,
    Address,
    Contact,

}
#[derive(Clone, Serialize, Deserialize)]
pub enum EventType {
    Create,
    Delete,
    Update,
}
#[derive(Clone, Serialize, Deserialize)]
pub struct Event {
    pub id: EventId,
    pub create_date: time::OffsetDateTime,
    pub event_type: EventType,
    pub entity: EventEntity,
    pub related_entity: uuid::Uuid,
    pub completed: bool,
}

impl Entity for Event{
    fn generate_id() ->impl IdGenerator {
        EventId::default()
    }
}

impl Event {
    pub fn new(
        id: Option<uuid::Uuid>,
        event: Option<EventType>,
        entity: EventEntity,
        related_entity_id: uuid::Uuid,
        completed: bool,
    ) -> Self {
        let current_id = match id {
            Some(id) => id,
            None => Event::generate_id().get_id(),
        };
        let event_type = match event {
            Some(event) => event,
            None => EventType::Create,
        };
        Self {
            id: EventId::from_id(current_id),
            event_type,
            create_date: OffsetDateTime::now_utc(),
            related_entity: related_entity_id,
            completed,
            entity
        }
    }
}
