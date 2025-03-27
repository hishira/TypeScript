use crate::{
    api::{
        dtos::userdto::credentialsdto::CredentialsFilterOption,
        queries::{actionquery::ActionQueryBuilder, query::Query},
    },
    core::user::{authentication::Authentication, userid::UserId},
};
use sqlx::{Postgres, QueryBuilder};

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

    fn update(_: Authentication) -> QueryBuilder<'static, Postgres> {
        todo!()
    }

    fn delete(_entity: Authentication) -> QueryBuilder<'static, Postgres> {
        todo!()
    }
}

impl Query<CredentialsFilterOption> for AuthenticationQuery {
    fn build(&self) -> String {
        todo!()
    }

    fn find(option: CredentialsFilterOption) -> QueryBuilder<'static, Postgres> {
        let mut find_query: QueryBuilder<'static, Postgres> =
            QueryBuilder::new("SELECT * FROM USERLOGIN WHERE current_state = 'Active'");
        match (
            option.username,
            option.password,
            option.password_is_temporary,
        ) {
            (Some(username), Some(_), Some(_)) => {
                find_query.push(" AND username = ");
                find_query.push_bind(username);
                find_query
            }
            (_, Some(_), Some(_)) => todo!(),
            (Some(username), _, Some(_)) => {
                find_query.push(" AND username = ");
                find_query.push_bind(username);
                find_query
            }
            (Some(username), Some(_), _) => {
                find_query.push(" AND username = ");
                find_query.push_bind(username);
                find_query
            }

            (Some(username), _, _) => {
                find_query.push(" AND username = ");
                find_query.push_bind(username);
                find_query
            }
            (_, __, Some(_)) => todo!(),
            (_, Some(_), __) => todo!(),

            _ => todo!(),
        }
    }

    fn find_by_id(id: uuid::Uuid) -> QueryBuilder<'static, Postgres> {
        // Find only by user_id, table not has id
        let mut find_query: QueryBuilder<'static, Postgres> =
            QueryBuilder::new("SELECT * FROM USERLOGIN WHERE id =  ");
        find_query.push_bind(id);
        find_query
    }
}
