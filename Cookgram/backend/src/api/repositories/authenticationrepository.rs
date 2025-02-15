use mongodb::Database;
use sqlx::{Pool, Postgres};

use crate::api::daos::authenticationdao::AuthenticationDAO;

#[derive(Clone)]
pub struct AuthenticationRepository{
    pub db: Pool<Postgres>,
    pub db_context: Database,
    pub auth_dao: AuthenticationDAO

}

impl AuthenticationRepository {}