use mongodb::Database;
use sqlx::{Pool, Postgres};

use crate::core::user::user::User;

use super::dao::DAO;

pub struct UserDAO {
    pub pool: Pool<Postgres>,
    pub db_context: Database,
}

impl DAO<User> for UserDAO {
    fn create(entity: User) -> User {
        todo!()
    }
}

impl UserDAO {
    
}
