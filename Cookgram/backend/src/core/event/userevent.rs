use super::event::{Event, EventEntity, EventType};

pub struct UserEvent {}

impl UserEvent {
    pub fn create_event(id: uuid::Uuid) -> Event {
        Event::new(None, Some(EventType::Create), EventEntity::User, id, true)
    }

    pub fn update_event(id: uuid::Uuid) -> Event {
        Event::new(None, Some(EventType::Update), EventEntity::User, id, true)
    }

    pub fn delete_event(id: uuid::Uuid) -> Event {
        Event::new(None, Some(EventType::Delete), EventEntity::User, id, true)
    }
}
