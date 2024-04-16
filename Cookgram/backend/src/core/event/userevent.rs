use super::event::{Event, EventType};

pub struct UserEvent {}

impl UserEvent {
    pub fn create_event(id: uuid::Uuid) -> Event {
        Event::new(None, Some(EventType::Create), id.clone(), true)
    }
}
