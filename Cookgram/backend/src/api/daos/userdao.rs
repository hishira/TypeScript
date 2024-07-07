use async_trait::async_trait;
use mongodb::Database;
use sqlx::{
    postgres::{PgQueryResult, PgRow},
    Executor, FromRow, Pool, Postgres,
};

use crate::{
    api::{
        dtos::userdto::{userdto::UserFilterOption, userlistdto::UserListDto},
        queries::{actionquery::ActionQueryBuilder, query::Query, userquery::userquery::UserQuery},
        services::userservice::UserService,
    },
    core::user::user::User,
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
        let mut create_user_query = UserQuery::create(entity.clone());
        let response = match executor {
            Some(exec) => create_user_query.build().execute(exec).await,
            None => create_user_query.build().execute(&self.pool).await,
        };
        response
    }

    async fn find(&self, option: UserFilterOption) -> Result<Vec<User>, sqlx::Error> {
        let mut find_query = UserQuery::find(option);
        find_query
            .build()
            .map(UserService::get_user_from_row)
            .fetch_all(&self.pool)
            .await
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Result<User, sqlx::Error> {
        let mut find_by_id_query = UserQuery::find_by_id(id);
        find_by_id_query
            .build()
            .map(UserService::get_user_from_row)
            .fetch_one(&self.pool)
            .await
    }

    async fn delete(&self, entity: User) -> Result<PgQueryResult, sqlx::Error> {
        let mut delete_query = UserQuery::delete(entity.clone());
        delete_query.build().execute(&self.pool).await
    }
}

impl UserDAO {
    pub async fn user_list(&self, params: UserFilterOption) -> Result<Vec<UserListDto>, sqlx::Error> {
        let mut find_query = UserQuery::find(params);
        let result = find_query.build().fetch_all(&self.pool).await?;
        Ok(result
            .iter()
            .map(|row| UserListDto::from_row(row).expect("Cannot cast from row to UserListDto"))
            .collect())
    }
}
