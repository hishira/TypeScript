use sqlx::{Postgres, QueryBuilder};

use crate::{
    api::{dtos::eventdto::eventdto::convert_from_event, queries::actionquery::ActionQueryBuilder},
    core::event::event::Event,
};

#[derive(Clone)]
pub struct EventQuery {}

impl ActionQueryBuilder<Event> for EventQuery {
    fn create(entity: Event) -> sqlx::QueryBuilder<'static, sqlx::Postgres> {
        let mut create_builder: QueryBuilder<Postgres> = QueryBuilder::new(
            "INSERT INTO EVENTS(id, created_date, event_type, related_entity, completed) ",
        );
        create_builder.push_values(vec![entity], |mut b, event| {
            b.push_bind(event.id.get_id())
                .push_bind(event.create_date)
                .push_bind(convert_from_event(event.event_type))
                .push_bind(event.related_entity)
                .push_bind(event.completed);
        });
        create_builder
    }

    fn update(_: Event) -> sqlx::QueryBuilder<'static, sqlx::Postgres> {
        todo!()
    }

    fn delete(_: Event) -> QueryBuilder<'static, Postgres> {
        todo!()
    }
}
