use crate::core::address::address::Address;
use crate::core::entity::Entity;
use crate::api::queries::actionquery::ActionQuery;
use crate::api::errors::responseerror::ResponseError;
use crate::api::repositories::repositories::Repository;
use crate::api::daos::addressdao::AddressDAO;
use mongodb::Database;
use sqlx::{Pool, Postgres};
use uuid::Uuid;
use async_trait::async_trait;

#[derive(Clone)]
pub struct AddressRepository {
    pub pool: Pool<Postgres>,
    pub db_context: Database,
    pub address_dao: AddressDAO,
}

impl AddressRepository {
    pub fn new(pool: Pool<Postgres>, db_context: Database) -> Self {
        let address_dao = AddressDAO::new(pool.clone(), db_context.clone());
        Self { 
            pool,
            db_context,
            address_dao,
        }
    }
}

#[async_trait]
impl Repository<Address, ActionQuery, ResponseError> for AddressRepository {
    async fn create(&self, entity: Address) -> Address {
        match self.address_dao.create(entity.clone(), Some(&self.pool)).await {
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

    async fn find(&self, _option: ActionQuery) -> Result<Vec<Address>, ResponseError> {
        match self.address_dao.find(()).await {
            Ok(addresses) => {
                tracing::debug!("Addresses found successfully");
                Ok(addresses)
            }
            Err(err) => {
                tracing::error!("Failed to find addresses: {}", err);
                Err(ResponseError::InternalServerError)
            }
        }
    }

    async fn find_by_id(&self, id: Uuid) -> Address {
        match self.address_dao.find_by_id(id).await {
            Ok(address) => {
                tracing::debug!("Address found successfully");
                address
            }
            Err(err) => {
                tracing::error!("Failed to find address: {}", err);
                panic!("Address not found") // In a real application, you might want to handle this more gracefully
            }
        }
    }

    async fn delete(&self, entity: Address) -> Address {
        match self.address_dao.delete(entity.clone()).await {
            Ok(_) => {
                tracing::debug!("Address deleted successfully");
                entity
            }
            Err(err) => {
                tracing::error!("Failed to delete address: {}", err);
                entity
            }
        }
    }

    async fn update(&self, update_entity: Address) -> Address {
        match self.address_dao.update(update_entity.clone()).await {
            Ok(_) => {
                tracing::debug!("Address updated successfully");
                update_entity
            }
            Err(err) => {
                tracing::error!("Failed to update address: {}", err);
                update_entity
            }
        }
    }
}