use super::dao::DAO;
use crate::{
    api::{
        dtos::userdto::{
            authenticationuserdto::AuthenticationUserDto,
            credentialsdto::{CredentialsDTO, CredentialsFilterOption},
        },
        queries::{
            actionquery::ActionQueryBuilder, query::Query,
            userquery::authenticationquery::AuthenticationQuery,
        },
        utils::user::user_utils::UserUtils,
    },
    core::{
        state::{entitystate::EntityState, state::State},
        user::{authentication::Authentication, userid::UserId},
    },
};
use async_trait::async_trait;
use sqlx::Row;
use sqlx::{
    postgres::{PgQueryResult, PgRow},
    Executor, Pool, Postgres,
};

#[derive(Clone)]
pub struct AuthenticationDAO {
    pub pool: Pool<Postgres>,
}

#[async_trait]
impl DAO<AuthenticationUserDto, CredentialsFilterOption> for AuthenticationDAO {
    async fn create<'a, E>(
        &self,
        entity: AuthenticationUserDto,
        executor: Option<E>,
    ) -> Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send,
    {
        let mut create_auth_query = AuthenticationQuery::create(Authentication {
            user_id: entity.id,
            password_is_temporary: Some(entity.credentials.password_is_temporary),
            username: entity.credentials.username,
            password: entity.credentials.password,
        });
        let response: Result<PgQueryResult, sqlx::Error> = match executor {
            Some(exec) => create_auth_query.build().execute(exec).await,
            None => create_auth_query.build().execute(&self.pool).await,
        };

        response
    }

    async fn find(
        &self,
        option: CredentialsFilterOption,
    ) -> Result<Vec<AuthenticationUserDto>, sqlx::Error> {
        AuthenticationQuery::find(option)
            .build()
            .try_map(get_authentication_from_row)
            .fetch_all(&self.pool)
            .await
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Result<AuthenticationUserDto, sqlx::Error> {
        AuthenticationQuery::find_by_id(id)
            .build()
            .try_map(get_authentication_from_row)
            .fetch_one(&self.pool)
            .await
    }

    async fn delete(&self, _entity: AuthenticationUserDto) -> Result<PgQueryResult, sqlx::Error> {
        todo!()
    }
}

fn get_authentication_from_row(row: PgRow) -> Result<AuthenticationUserDto, sqlx::Error> {
    Ok(AuthenticationUserDto {
        id: UserId::from_id(row.try_get("id")?),
        role: UserUtils::retrive_role_from_row(&row)?,
        credentials: CredentialsDTO {
            username: row.try_get("username")?,
            password: row.try_get("password")?,
            password_is_temporary: true,
        },
        state: State {
            current: EntityState::Active,
            previous: None,
        }, // Zakładając, że nie masz implementacji EntityState
    })
}
