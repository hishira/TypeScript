use sqlx::{Pool, Postgres, QueryBuilder};

use crate::{
    api::queries::{actionquery::ActionQueryBuilder, eventquery::eventquery::EventQuery},
    core::event::event::Event,
};

use super::repositories::Repository;

#[derive(Clone)]
pub struct EventRepository {
    pub pool: Pool<Postgres>,
    pub event_query: EventQuery,
}

pub struct EventFilterOption {}

impl EventRepository {
    pub fn create_later(&self, entity: Event) -> Event {
        println!("Event to create");
        run_thread(self.pool.clone(), entity.clone());

        entity
    }
}

impl Repository<Event, EventFilterOption> for EventRepository {
    async fn create(&self, entity: Event) -> Event {
        let mut creation_query = EventQuery {}.create(entity.clone());
        let event_response = creation_query.build().fetch_one(&self.pool).await;
        match event_response {
            Ok(_) => tracing::debug!(
                "Event created for entity: {} created",
                entity.related_entity
            ),
            Err(err) => tracing::error!("Error occur while event creating, {}", err),
        }

        entity
    }

    async fn find(&self, option: EventFilterOption) -> Vec<Event> {
        todo!()
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Event {
        todo!()
    }

    fn delete(option: Event) -> Event {
        todo!()
    }

    fn update(update_entity: Event) -> Event {
        todo!()
    }
}

fn run_thread(postgres_pool: Pool<Postgres>, entity: Event) {
    tokio::task::spawn(async move {
        let mut creation_query = EventQuery {}.create(entity.clone());
        let event_response = creation_query.build().execute(&postgres_pool).await;
        match event_response {
            Ok(_) => tracing::debug!(
                "Event created for entity: {} created",
                entity.related_entity
            ),
            Err(err) => tracing::error!("Error occur while event creating, {}", err),
        }
    });
}
