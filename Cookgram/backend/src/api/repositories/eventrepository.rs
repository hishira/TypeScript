use mongodb::Database;
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
    pub fn create_later(pool: Database, entity: Event) -> Event {
        run_thread(pool.clone(), entity.clone());

        entity
    }
}

impl Repository<Event, EventFilterOption, sqlx::Error> for EventRepository {
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

    async fn find(&self, option: EventFilterOption) -> Result<Vec<Event>, sqlx::Error> {
        todo!()
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Event {
        todo!()
    }

    async fn delete(&self, option: Event) -> Event {
        todo!()
    }

    async fn update(&self, update_entity: Event) -> Event {
        todo!()
    }
}

fn run_thread(mongo_db: Database, entity: Event) {
    tokio::task::spawn(async move {
        let event_collection = mongo_db.collection("Events");
        event_collection.insert_one(entity, None).await
    });
}
