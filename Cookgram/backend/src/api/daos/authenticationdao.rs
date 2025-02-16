use sqlx::{postgres::PgQueryResult, Executor, Pool, Postgres};

use crate::{
    api::dtos::userdto::credentialsdto::CredentialsFilterOption,
    core::user::{authentication::Authentication, credentials::Credentials},
};
use async_trait::async_trait;

use super::dao::{SmallDAO, DAO};

#[derive(Clone)]
pub struct AuthenticationDAO {
    pub pool: Pool<Postgres>,
}

#[async_trait]
impl DAO<Authentication, CredentialsFilterOption> for AuthenticationDAO {
    async fn create<'a, E>(
        &self,
        entity: Authentication,
        executor: Option<E>,
    ) -> Result<PgQueryResult, sqlx::Error> where
    E: Executor<'a, Database = Postgres> + Send, {
        todo!()
    }

    async fn find(&self, option: CredentialsFilterOption) -> Result<Vec<Authentication>, sqlx::Error> {
        todo!();
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Result<Authentication, sqlx::Error> {
       todo!()
    }

    async fn delete(&self, entity: Authentication) -> Result<PgQueryResult, sqlx::Error> {
        todo!()

    }
}
