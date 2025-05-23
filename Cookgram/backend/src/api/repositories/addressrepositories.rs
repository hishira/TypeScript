use crate::core::address::address::Address;
use crate::core::entity::Entity;
use crate::api::queries::actionquery::ActionQuery;
use crate::api::errors::responseerror::ResponseError;
use crate::api::repositories::repositories::Repository;
use sqlx::{Pool, Postgres, QueryBuilder};
use uuid::Uuid;
use async_trait::async_trait;

#[derive(Clone)]
pub struct AddressRepository {
    pub pool: Pool<Postgres>,
}

impl AddressRepository {
    pub fn new(pool: Pool<Postgres>) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl Repository<Address, ActionQuery, ResponseError> for AddressRepository {
    async fn create(&self, entity: Address) -> Address {
        let address_id = Uuid::new_v4();
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("INSERT INTO ADDRESS(id, address, house, door, city, country, lat, long, postal_code) ");

        query_builder.push_values(vec![entity.clone()], |mut b, address| {
            b.push_bind(address_id)
                .push_bind(address.address)
                .push_bind(address.house)
                .push_bind(address.door)
                .push_bind(address.city)
                .push_bind(address.country)
                .push_bind(address.location.latitude)
                .push_bind(address.location.longitude)
                .push_bind(address.postal_code);
        });

        let result = query_builder.build().execute(&self.pool).await;
        match result {
            Ok(_) => {
                tracing::debug!("Address created successfully");
                entity
            }
            Err(err) => {
                tracing::error!("Failed to create address: {}", err);
                entity
            }
        }
    }

    async fn find(&self, option: ActionQuery) -> Result<Vec<Address>, ResponseError> {
        // Implement find logic here
        todo!("Implement find logic")
    }

    async fn find_by_id(&self, id: Uuid) -> Address {
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("SELECT id, address, house, door, city, country, lat, long, postal_code FROM ADDRESS WHERE id = ");
        
        query_builder.push_bind(id);

        let result = query_builder
            .build()
            .fetch_one(&self.pool)
            .await;

        match result {
            Ok(row) => {
                tracing::debug!("Address found successfully");
                Address::new(
                    row.get("address"),
                    row.get("house"),
                    row.get("door"),
                    row.get("city"),
                    row.get("country"),
                    crate::core::address::location::Location {
                        latitude: row.get("lat"),
                        longitude: row.get("long"),
                    },
                    row.get("postal_code"),
                )
            }
            Err(err) => {
                tracing::error!("Failed to find address: {}", err);
                panic!("Address not found") // In a real application, you might want to handle this more gracefully
            }
        }
    }

    async fn delete(&self, option: Address) -> Address {
        // Implement delete logic here
        todo!("Implement delete logic")
    }

    async fn update(&self, update_entity: Address) -> Address {
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("UPDATE ADDRESS SET ");
            
        query_builder
            .push("address = ")
            .push_bind(update_entity.address.clone())
            .push(", house = ")
            .push_bind(update_entity.house.clone())
            .push(", door = ")
            .push_bind(update_entity.door.clone())
            .push(", city = ")
            .push_bind(update_entity.city.clone())
            .push(", country = ")
            .push_bind(update_entity.country.clone())
            .push(", lat = ")
            .push_bind(update_entity.location.latitude)
            .push(", long = ")
            .push_bind(update_entity.location.longitude)
            .push(", postal_code = ")
            .push_bind(update_entity.postal_code.clone())
            .push(" WHERE id = ")
            .push_bind(update_entity.id.get_id());

        let result = query_builder
            .build()
            .execute(&self.pool)
            .await;

        match result {
            Ok(_) => {
                tracing::debug!("Address updated successfully");
                update_entity
            }
            Err(err) => {
                tracing::error!("Failed to update address: {}", err);
                update_entity // In a real application, you might want to handle this differently
            }
        }
    }
}