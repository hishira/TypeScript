use std::ops::DerefMut;

use async_trait::async_trait;
use mongodb::Database;
use sqlx::{postgres::PgQueryResult, Acquire, Executor, Pool, Postgres, QueryBuilder, Transaction};
use uuid::Uuid;

use crate::{
    api::{
        dtos::userdto::userdto::UserFilterOption,
        queries::{
            actionquery::ActionQueryBuilder,
            query::Query,
            userquery::{authenticationquery::AuthenticationQuery, userquery::UserQuery},
        },
        utils::user::user_utils::UserUtils,
    },
    core::user::{authentication::Authentication, user::User},
};

use super::dao::DAO;

#[derive(Clone)]
pub struct UserDAO {
    pub pool: Pool<Postgres>,
    pub db_context: Database,
}

#[async_trait]
impl DAO<User, UserFilterOption> for UserDAO {
    async fn create<'a, E>(
        &self,
        entity: User,
        executor: Option<E>,
    ) -> Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send,
    {
        //TODO: Check if can be refactor
        let mut create_user_query = UserQuery::create(entity.clone());
        let auth: Authentication =
            Authentication::from_credentials(entity.id.clone(), entity.credentials);
        let mut auth_query = AuthenticationQuery::create(auth);
        let response = match executor {
            Some(exec) => {
                create_user_query.build().execute(exec).await?;
                let mut conn = self.pool.acquire().await?;
                let mut tx = conn.begin().await?;
                let res = auth_query.build().execute(tx.deref_mut()).await?;
                tx.commit().await?;
                Ok(res)
            }
            None => {
                let mut conn = self.pool.acquire().await?;
                let mut tx = conn.begin().await?;
                create_user_query.build().execute(tx.deref_mut()).await?;
                let res = auth_query.build().execute(tx.deref_mut()).await?;
                tx.commit().await?;
                Ok(res)
            }
        };
        response
    }

    async fn find(&self, option: UserFilterOption) -> Result<Vec<User>, sqlx::Error> {
        let mut find_query = UserQuery::find(option);
        find_query
            .build()
            .map(UserUtils::get_from_row)
            .fetch_all(&self.pool)
            .await
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Result<User, sqlx::Error> {
        let mut find_by_id_query = UserQuery::find_by_id(id);
        find_by_id_query
            .build()
            .map(UserUtils::get_from_row)
            .fetch_one(&self.pool)
            .await
    }

    async fn delete(&self, entity: User) -> Result<PgQueryResult, sqlx::Error> {
        let mut delete_query = UserQuery::delete(entity.clone());
        delete_query.build().execute(&self.pool).await
    }
}

impl UserDAO {
    pub async fn user_list(&self, params: UserFilterOption) -> Result<Vec<User>, sqlx::Error> {
        let mut find_query = UserQuery::find(params);
        let result = find_query.build().fetch_all(&self.pool).await?;
        Ok(result.iter().map(UserUtils::get_from_row_ref).collect())
    }

    pub async fn create_user_connection(
        &self,
        user_ids_touple: (Uuid, Uuid),
    ) -> Result<PgQueryResult, sqlx::Error> {
        let mut create_user_connection: QueryBuilder<Postgres> =
            QueryBuilder::new("INSERT INTO EMPLOYEE_CONNECTION (owner_id, user_id) ");
        create_user_connection.push_values(std::iter::once(user_ids_touple), |mut b, touple| {
            b.push_bind(touple.0).push_bind(touple.1);
        });
        return create_user_connection.build().execute(&self.pool).await;
    }
}
