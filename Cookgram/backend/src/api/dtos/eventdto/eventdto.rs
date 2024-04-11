use crate::core::event::event::EventType;

#[derive(sqlx::Type)]
#[sqlx(type_name = "EventType")]
pub enum EventTypeDto {
    Create,
    Delete,
    Update,
}

impl EventTypeDto {
    pub fn convert_from_event(event: EventType) -> Self {
        match event {
            EventType::Create => EventTypeDto::Create,
            EventType::Delete => EventTypeDto::Delete,
            EventType::Update => EventTypeDto::Update,
        }
    }
}
