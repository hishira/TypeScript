use mongodb::Database;
use sqlx::{Pool, Postgres};

use crate::{api::{daos::{authenticationdao::AuthenticationDAO, dao::DAO}, dtos::userdto::{credentialsdto::CredentialsFilterOption, userdto::UserFilterOption}}, core::user::{authentication::Authentication, user::User}};

use super::repositories::Repository;

#[derive(Clone)]
pub struct AuthenticationRepository{
    pub db: Pool<Postgres>,
    pub db_context: Database,
    pub auth_dao: AuthenticationDAO

}

impl AuthenticationRepository {}

impl Repository<Authentication, CredentialsFilterOption, sqlx::Error> for AuthenticationRepository {
    async fn create(&self, entity: Authentication) -> Authentication {
        todo!()
    }

    async fn find(&self, option: CredentialsFilterOption) -> Result<Vec<Authentication>, sqlx::Error> {
        self.auth_dao.find(option).await
    }

    async fn find_by_id(&self, id: uuid::Uuid) -> Authentication {
        todo!()
    }

    async fn delete(&self, option: Authentication) -> Authentication {
        todo!()
    }

    async fn update(&self, update_entity: Authentication) -> Authentication {
        todo!()
    }
}