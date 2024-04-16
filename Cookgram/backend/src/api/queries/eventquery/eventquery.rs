use sqlx::{Postgres, QueryBuilder};

use crate::{api::{dtos::eventdto::eventdto::EventTypeDto, queries::actionquery::ActionQueryBuilder}, core::event::event::Event};

#[derive(Clone)]
pub struct EventQuery {}

impl ActionQueryBuilder<Event> for EventQuery {
    fn create(&self, entity: Event) -> sqlx::QueryBuilder<sqlx::Postgres> {
        let mut create_builder: QueryBuilder<Postgres> = QueryBuilder::new(
            "INSERT INTO EVENTS(id, created_date, event_type, related_entity, completed) ",
        );
        create_builder.push_values(vec![entity], |mut b, event| {
            b.push_bind(event.id)
                .push_bind(event.create_date)
                .push_bind(EventTypeDto::convert_from_event(event.event_type))
                .push_bind(event.related_entity)
                .push_bind(event.completed);
        });
        create_builder
    }

    fn update(&self, entity: Event) -> sqlx::QueryBuilder<sqlx::Postgres> {
        todo!()
    }

    fn delete(&self, entity: Event) -> QueryBuilder< Postgres>  {
        todo!()
    }
}
