use mongodb::Database;
use sqlx::{Pool, Postgres};

use crate::{api::{daos::{authenticationdao::AuthenticationDAO, dao::DAO}, dtos::userdto::{authenticationuserdto::AuthenticationUserDto, credentialsdto::CredentialsFilterOption, userdto::UserFilterOption}}, core::user::{authentication::Authentication, user::User}};

use super::repositories::Repository;

#[derive(Clone)]
pub struct AuthenticationRepository{
    pub db: Pool<Postgres>,
    pub db_context: Database,
    pub auth_dao: AuthenticationDAO

}

impl AuthenticationRepository {}

impl Repository<AuthenticationUserDto, CredentialsFilterOption, sqlx::Error> for AuthenticationRepository {
    async fn create(&self, _entity: AuthenticationUserDto) -> AuthenticationUserDto {
        todo!()
    }

    async fn find(&self, option: CredentialsFilterOption) -> Result<Vec<AuthenticationUserDto>, sqlx::Error> {
        self.auth_dao.find(option).await
    }

    async fn find_by_id(&self, _id: uuid::Uuid) -> AuthenticationUserDto {
        todo!()
    }

    async fn delete(&self, _option: AuthenticationUserDto) -> AuthenticationUserDto {
        todo!()
    }

    async fn update(&self, _update_entity: AuthenticationUserDto) -> AuthenticationUserDto {
        todo!()
    }
}