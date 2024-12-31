use crate::core::event::event::EventType;

#[derive(sqlx::Type)]
#[sqlx(type_name = "EventType")]
pub enum EventTypeDto {
    Create,
    Delete,
    Update,
}

pub fn convert_from_event(event: EventType) -> EventTypeDto {
    match event {
        EventType::Create => EventTypeDto::Create,
        EventType::Delete => EventTypeDto::Delete,
        EventType::Update => EventTypeDto::Update,
    }
}
