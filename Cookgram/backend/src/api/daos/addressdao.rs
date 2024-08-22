use std::any::Any;

use mongodb::Database;
use sqlx::{postgres::PgQueryResult, Pool, Postgres};

use crate::core::address::address::Address;

use super::dao::DAO;

#[derive(Clone)]
pub struct AddressDAO {
    pub pool: Pool<Postgres>,
    pub db_context: Database
}

pub struct AddressFilterOption{}
#[async_trait]
impl DAO<Address, AddressFilterOption> for AddressDAO {
    async fn create<'a,E >(&self, entity: Address, executor: Option<E>) -> Result<PgQueryResult, sqlx::Error>  {
        let mut create_query = AddressQue
    }
}