use sqlx::{Execute, Postgres, QueryBuilder};
use uuid::Uuid;

use crate::{
    api::{
        dtos::userdto::userdto::UserFilterOption,
        queries::{actionquery::ActionQueryBuilder, query::Query},
    },
    core::user::user::User,
};

#[derive(Clone)]
pub struct UserQuery {
    id: Option<Uuid>,
    username: Option<String>,
    email: Option<String>,
}

impl UserQuery {
    const QUERY_FIND_BY_ID: &'static str = "SELECT id, username, email, password, meta_id, role, current_state, previous_state FROM ADDRESSUSERS WHERE id = ";

    pub fn new(id: Option<Uuid>, username: Option<String>, email: Option<String>) -> Self {
        Self { id, username, email }
    }

    fn prepare_filter(
        user_query: &mut QueryBuilder<Postgres>,
        mut count: i8,
        field: &str,
        value: Option<String>,
    ) -> i8 {
        if let Some(value) = value {
            if count > 0 {
                user_query.push(format!(" AND {} = ", field));
            } else {
                user_query.push(format!(" WHERE {} = ", field));
            }
            user_query.push_bind(value);
            count + 1
        } else {
            count
        }
    }

    fn prepare_username(
        user_query: &mut QueryBuilder<Postgres>,
        count: i8,
        username: Option<String>,
    ) -> i8 {
        Self::prepare_filter(user_query, count, "username", username)
    }

    fn prepare_email(
        user_query: &mut QueryBuilder<Postgres>,
        count: i8,
        email: Option<String>,
    ) -> i8 {
        Self::prepare_filter(user_query, count, "email", email)
    }
}

impl Query<UserFilterOption> for UserQuery {
    fn build(&self) -> String {
        let mut user_query: QueryBuilder<Postgres> = QueryBuilder::new("SELECT * FROM users where");
        let mut count: i8 = 0;
        if let Some(id) = self.id {
            user_query.push(" id = ");
            count += 1;
            user_query.push_bind(id.to_string());
        }
        UserQuery::prepare_username(&mut user_query, count, self.username.clone());
        UserQuery::prepare_email(&mut user_query, count, self.email.clone());
        user_query.build().sql().to_string()
    }

    fn find(option: UserFilterOption) -> QueryBuilder<'static, Postgres> {
        let mut user_query: QueryBuilder<Postgres> =
            QueryBuilder::new("SELECT * FROM ADDRESSUSERS");
        let mut count: i8 = 0;
        if let Some(owner_id) = option.owner_id {
            user_query
                .push(" WHERE id in (select user_id from EMPLOYEE_CONNECTION where owner_id = ");
            user_query.push_bind(owner_id);
            user_query.push(") ");
            count += 1;
        }
        UserQuery::prepare_username(&mut user_query, count, option.username.clone());
        if !option.with_admin.unwrap_or(false) {
            if count > 0 {
                user_query.push(" AND role not in ('Admin', 'SuperAdmin') ");
            } else {
                user_query.push(" where role not in ('Admin', 'SuperAdmin') ");
            }
        }
        user_query.push(" limit ");
        user_query.push_bind(option.limit.unwrap_or(10));
        user_query.push(" offset ");
        user_query.push_bind(option.offset.unwrap_or(0));
        user_query
    }

    fn find_by_id(id: uuid::Uuid) -> QueryBuilder<'static, Postgres> {
        let mut query_by_id: QueryBuilder<Postgres> = QueryBuilder::new(Self::QUERY_FIND_BY_ID);
        query_by_id.push_bind(id);
        query_by_id
    }
}

impl ActionQueryBuilder<User> for UserQuery {
    fn create(entity: User) -> QueryBuilder<'static, Postgres> {
        let mut create_builder = QueryBuilder::new(
            "INSERT INTO USERS(id, username, password, email, meta_id, role, first_name, last_name) ",
        );
        create_builder.push_values(std::iter::once(entity), |mut b, user| {
            b.push_bind(user.id.get_id())
                .push_bind(user.credentials.username)
                .push_bind(user.credentials.password)
                .push_bind(user.personal_information.email)
                .push_bind(user.meta.id.get_id())
                .push_bind(user.role)
                .push_bind(user.personal_information.first_name)
                .push_bind(user.personal_information.last_name);
        });
        create_builder.push(" RETURNING id, email;");
        create_builder
    }

    fn update(entity: User) -> QueryBuilder<'static, Postgres> {
        let mut update_query = QueryBuilder::new("UPDATE USERS SET ");
        update_query
            .push("username = ")
            .push_bind(entity.credentials.username)
            .push(", email = ")
            .push_bind(entity.personal_information.email)
            .push(", password = ")
            .push_bind(entity.credentials.password)
            .push(", role = ")
            .push_bind(entity.role)
            .push(" WHERE id = ")
            .push_bind(entity.id.get_id());
        update_query
    }

    fn delete(entity: User) -> QueryBuilder<'static, Postgres> {
        let mut delete_query = QueryBuilder::new("UPDATE USERS SET ");
        delete_query
            .push("current_state = ")
            .push_bind(entity.state.current)
            .push(", previous_state = ")
            .push_bind(entity.state.previous)
            .push(" WHERE id = ")
            .push_bind(entity.id.get_id());
        delete_query
    }
}
