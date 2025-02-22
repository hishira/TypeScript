use sqlx::{
    postgres::{PgQueryResult, PgRow},
    Executor, Pool, Postgres,
};

use crate::{
    api::{
        dtos::userdto::{
            authenticationuserdto::AuthenticationUserDto,
            credentialsdto::{CredentialsDTO, CredentialsFilterOption},
            personalinformationdto::PersolanInformationDTO,
        },
        queries::{
            actionquery::ActionQueryBuilder, query::Query,
            userquery::authenticationquery::AuthenticationQuery,
        },
    },
    core::{
        meta::{meta::Meta, metaid::MetaId},
        state::{entitystate::EntityState, state::State},
        user::{
            authentication::Authentication, credentials::Credentials, personalinformation::Gender,
            userid::UserId,
        },
    },
};
use async_trait::async_trait;
use sqlx::Row;

use super::dao::DAO;

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
            password: entity.credentials.password
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
        let mut find_query = AuthenticationQuery::find(option);
        find_query
            .build()
            .map(get_authentication_from_row)
            .fetch_all(&self.pool)
            .await
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Result<AuthenticationUserDto, sqlx::Error> {
        let mut find_query = AuthenticationQuery::find_by_id(id);
        find_query
            .build()
            .map(get_authentication_from_row)
            .fetch_one(&self.pool)
            .await
    }

    async fn delete(&self, entity: AuthenticationUserDto) -> Result<PgQueryResult, sqlx::Error> {
        todo!()
    }
}

fn get_authentication_from_row(row: PgRow) ->AuthenticationUserDto {
    AuthenticationUserDto {
        id: UserId::from_id(row.try_get("id").unwrap()),
        personal_information: PersolanInformationDTO {
            first_name: row.try_get("first_name").unwrap(),
            last_name: row.try_get("last_name").unwrap(),
            brithday: row.try_get("brithday").unwrap(),
            email: row.try_get("email").ok(),
            gender: match row.try_get::<String, _>("gender").unwrap().as_str() {
                "Man" => Gender::Man,
                "Woman" => Gender::Woman,
                _ => Gender::None,
            },
            contacts: None,
        },
        credentials: CredentialsDTO {
            username: row.try_get("username").unwrap(),
            password: row.try_get("password").unwrap(),
            password_is_temporary: row.try_get("password_is_temporary").unwrap(),
        },
        address: None, // Można dodać mapping, jeśli dane są dostępne
        meta: Meta {
            id: MetaId::from_id(row.try_get("meta_id").unwrap()),
            create_date: row.try_get("create_date").unwrap(),
            edit_date: row.try_get("edit_date").unwrap(),
        },
        state: State {
            current: EntityState::Active,
            previous: None,
        }, // Zakładając, że nie masz implementacji EntityState
    }
}
