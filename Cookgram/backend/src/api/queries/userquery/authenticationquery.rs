use sqlx::{Postgres, QueryBuilder};

use crate::{
    api::{
        dtos::userdto::credentialsdto::CredentialsFilterOption,
        queries::{actionquery::ActionQueryBuilder, query::Query},
    },
    core::user::{authentication::Authentication, credentials::Credentials, userid::UserId},
};

#[derive(Clone)]
pub struct AuthenticationQuery {
    user_id: UserId,
    username: String,
    password: String,
    password_is_temporary: Option<String>,
}

impl ActionQueryBuilder<Authentication> for AuthenticationQuery {
    fn create(entity: Authentication) -> sqlx::QueryBuilder<'static, sqlx::Postgres> {
        let mut create_builder: QueryBuilder<Postgres> = QueryBuilder::new(
            "INSERT INTO AUTHENTICATION(user_id, username, password, passowrd_is_temporary) ",
        );
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

impl Query<CredentialsFilterOption> for AuthenticationQuery {
    fn build(&self) -> String {
        todo!()
    }

    fn find(option: CredentialsFilterOption) -> QueryBuilder<'static, Postgres> {
        let mut find_query: QueryBuilder<'static, Postgres> =
            QueryBuilder::new("SELECT * FROM USERLOGIN");
        match (
            option.username,
            option.password,
            option.password_is_temporary,
        ) {
            (None, None, Some(_)) => todo!(),
            (None, Some(_), None) => todo!(),
            (None, Some(_), Some(_)) => todo!(),
            (Some(username), None, None) => {
                find_query.push(" WHERE username = ");
                find_query.push_bind(username);
                find_query
            }
            (Some(username), None, Some(_)) => {
                find_query.push(" WHERE username = ");
                find_query.push_bind(username);
                find_query
            }
            (Some(username), Some(_), None) => {
                find_query.push(" WHERE username = ");
                find_query.push_bind(username);
                find_query
            }
            (Some(username), Some(_), Some(_)) => {
                find_query.push(" WHERE username = ");
                find_query.push_bind(username);
                find_query
            }
            _ => todo!(),
        }
    }

    fn find_by_id(id: uuid::Uuid) -> QueryBuilder<'static, Postgres> {
        todo!()
    }
}
