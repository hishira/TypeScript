use crate::api::daos::addressdao::AddressDAO;
use crate::api::errors::responseerror::ResponseError;
use crate::api::queries::actionquery::ActionQuery;
use crate::api::repositories::repositories::Repository;
use crate::api::utils::messages::addressrepomessages::AddressRepoMessages;
use crate::core::address::address::Address;
use crate::core::entity::Entity;
use async_trait::async_trait;
use mongodb::Database;
use sqlx::{Pool, Postgres};
use uuid::Uuid;

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
        match self
            .address_dao
            .create(entity.clone(), Some(&self.pool))
            .await
        {
            Ok(_) => {
                tracing::debug!(AddressRepoMessages::ADDRESS_CREATE_SUCCESS);
                entity
            }
            Err(err) => {
                tracing::error!(
                    AddressRepoMessages::ADDRESS_CREATE_FAIL.replace("{}", &err.to_string())
                );
                entity
            }
        }
    }

    async fn find(&self, _option: ActionQuery) -> Result<Vec<Address>, ResponseError> {
        match self.address_dao.find(()).await {
            Ok(addresses) => {
                tracing::debug!("{}", AddressRepoMessages::ADDRESS_FIND_SUCCESS);
                Ok(addresses)
            }
            Err(err) => {
                tracing::error!(
                    AddressRepoMessages::ADDRESS_FIND_FAIL.replace("{}", &err.to_string())
                );
                Err(ResponseError::InternalServerError)
            }
        }
    }

    async fn find_by_id(&self, id: Uuid) -> Address {
        match self.address_dao.find_by_id(id).await {
            Ok(address) => {
                tracing::debug!(AddressRepoMessages::ADDRESS_FIND_BY_ID_SUCCESS);
                address
            }
            Err(err) => {
                tracing::error!(
                    AddressRepoMessages::ADDRESS_FIND_BY_ID_FAIL.replace("{}", &err.to_string())
                );
                panic!(AddressRepoMessages::ADDRESS_NOT_FOUND)
            }
        }
    }

    async fn delete(&self, entity: Address) -> Address {
        match self.address_dao.delete(entity.clone()).await {
            Ok(_) => {
                tracing::debug!("{}", AddressRepoMessages::ADDRESS_DELETE_SUCCESS);
                entity
            }
            Err(err) => {
                tracing::error!(
                    AddressRepoMessages::ADDRESS_DELETE_FAIL.replace("{}", &err.to_string())
                );
                entity
            }
        }
    }

    async fn update(&self, update_entity: Address) -> Address {
        match self.address_dao.update(update_entity.clone()).await {
            Ok(_) => {
                tracing::debug!(AddressRepoMessages::ADDRESS_UPDATE_SUCCESS);
                update_entity
            }
            Err(err) => {
                tracing::error!(
                    AddressRepoMessages::ADDRESS_UPDATE_FAIL.replace("{}", &err.to_string())
                );
                update_entity
            }
        }
    }
}
