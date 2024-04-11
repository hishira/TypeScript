use time::OffsetDateTime;

pub enum EventType {
    Create,
    Delete,
    Update,
}
pub struct Event {
    id: uuid::Uuid,
    create_date: time::Date,
    event_type: EventType,
    related_entity: uuid::Uuid,
    completed: bool,
}

impl Event {
    pub fn new(
        &self,
        id: Option<uuid::Uuid>,
        event: Option<EventType>,
        related_entity_id: uuid::Uuid,
        completed: bool,
    ) -> Self {
        let current_id = match id {
            Some(id) => id,
            None => uuid::Uuid::new_v4(),
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
