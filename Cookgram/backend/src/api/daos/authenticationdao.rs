use sqlx::{
    postgres::{PgQueryResult, PgRow},
    Executor, Pool, Postgres,
};

use crate::{
    api::{
        dtos::userdto::credentialsdto::CredentialsFilterOption,
        queries::{
            actionquery::ActionQueryBuilder, query::Query,
            userquery::authenticationquery::AuthenticationQuery,
        },
    },
    core::user::{authentication::Authentication, credentials::Credentials, userid::UserId},
};
use async_trait::async_trait;
use sqlx::Row;

use super::dao::DAO;

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
    ) -> Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send,
    {
        let mut create_auth_query = AuthenticationQuery::create(entity);
        let response: Result<PgQueryResult, sqlx::Error> = match executor {
            Some(exec) => create_auth_query.build().execute(exec).await,
            None => create_auth_query.build().execute(&self.pool).await,
        };

        response
    }

    async fn find(
        &self,
        option: CredentialsFilterOption,
    ) -> Result<Vec<Authentication>, sqlx::Error> {
        let mut find_query = AuthenticationQuery::find(option);
        find_query
            .build()
            .map(get_authentication_from_row)
            .fetch_all(&self.pool)
            .await
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Result<Authentication, sqlx::Error> {
        todo!()
    }

    async fn delete(&self, entity: Authentication) -> Result<PgQueryResult, sqlx::Error> {
        todo!()
    }
}

fn get_authentication_from_row(pg_row: PgRow) -> Authentication {
    Authentication {
        user_id: UserId::from_id(pg_row.get("id")),
        password: pg_row.try_get("password").unwrap_or(String::from("")),
        username: pg_row.try_get("username").unwrap_or(String::from("")),
        password_is_temporary: Some(pg_row.try_get("passowrd_is_temporary").unwrap_or(false)),
    }
}
