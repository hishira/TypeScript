use mongodb::Database;
use sqlx::{postgres::PgQueryResult, Executor, Pool, Postgres};
use async_trait::async_trait;

use crate::{api::queries::{actionquery::ActionQueryBuilder, userquery::userquery::UserQuery}, core::user::user::User};

use super::dao::DAO;

#[derive(Clone)]
pub struct UserDAO {
    pub pool: Pool<Postgres>,
    pub db_context: Database,
}

#[async_trait]
impl DAO<User> for UserDAO {
    async fn create<'a, E>(&self, entity: User, executor: Option<E>) -> Result<PgQueryResult, sqlx::Error>
     where  E: Executor<'a, Database = Postgres> + Send {
        let mut create_user_query = UserQuery::create(entity.clone());
        let response =  match executor {
            Some(exec) => {
                create_user_query.build().execute(exec).await
            },
            None => {
                create_user_query.build().execute(&self.pool).await

            }
        };
        response
    }
}

impl UserDAO {
    
}
