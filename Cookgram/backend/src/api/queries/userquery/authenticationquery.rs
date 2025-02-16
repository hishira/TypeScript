use sqlx::{Postgres, QueryBuilder};

use crate::{api::queries::actionquery::ActionQueryBuilder, core::user::{authentication::Authentication, credentials::Credentials, userid::UserId}};

#[derive(Clone)]
pub struct AuthenticationQuery {
    user_id: UserId,
    username: String,
    password: String,
    password_is_temporary: Option<String>,
}

impl ActionQueryBuilder<Authentication> for AuthenticationQuery {
    fn create(entity: Authentication) -> sqlx::QueryBuilder<'static, sqlx::Postgres> {
        let mut create_builder: QueryBuilder<Postgres> = QueryBuilder::new("INSERT INTO AUTHENTICATION(user_id, username, password, passowrd_is_temporary) ");
        create_builder.push_values(vec![entity], |mut b, auth| {
            b.push_bind(auth.user_id.get_id())
            .push_bind(auth.username)
            .push_bind(auth.password)
            .push_bind(auth.password_is_temporary.unwrap_or(false));
        });
        create_builder

    }

    fn update(entity: Authentication) -> QueryBuilder<'static, Postgres> {
        todo!()
    }

    fn delete(entity: Authentication) -> QueryBuilder<'static, Postgres> {
        todo!()
    }
}