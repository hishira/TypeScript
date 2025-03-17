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
    const QUERY_FIND_BY_ID:&'static str = "SELECT id, username, email, password, meta_id, role, current_state, previous_state  FROM ADDRESSUSERS where id = ";
    pub fn new(id: Option<Uuid>, user_name: Option<String>, email: Option<String>) -> Self {
        UserQuery {
            id,
            username: user_name,
            email: email,
        }
    }

    fn prepare_username(
        user_query: &mut QueryBuilder<Postgres>,
        mut count: i8,
        username: Option<String>,
    ) {
        if let Some(user_name) = username {
            if count > 0 {
                user_query.push(" AND username = ");
                user_query.push_bind(user_name);
                count += 1;
            } else {
                user_query.push(" where username = ");
                user_query.push_bind(user_name);
                count += 1;
            }
        }
    }

    fn prepare_email(
        user_query: &mut QueryBuilder<Postgres>,
        mut count: i8,
        email: Option<String>,
    ) {
        if let Some(email) = email {
            if count > 0 {
                user_query.push(" AND email = ");
                user_query.push_bind(email);
                count += 1;
            } else {
                user_query.push(" email = ");
                user_query.push_bind(email);
                count += 1;
            }
        }
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
        let mut create_builder: QueryBuilder<Postgres> =
            QueryBuilder::new("INSERT INTO USERS(id, email, meta_id, role, first_name, last_name) ");
        create_builder.push_values(vec![entity], |mut b, user| {
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
        let mut update_query: QueryBuilder<Postgres> =
            QueryBuilder::new("UPDATE USERS SET username = ");
        update_query.push_bind(entity.credentials.username);
        update_query.push(", email = ");
        update_query.push_bind(entity.personal_information.email);
        update_query.push(", password = ");
        update_query.push_bind(entity.credentials.password);
        update_query.push(", role = ");
        update_query.push_bind(entity.role);
        update_query.push(" WHERE id = ");
        update_query.push_bind(entity.id.get_id());

        update_query
    }

    fn delete(entity: User) -> QueryBuilder<'static, Postgres> {
        let mut delete_query: QueryBuilder<Postgres> =
            QueryBuilder::new("UPDATE USERS SET current_state = ");
        delete_query.push_bind(entity.state.current);
        delete_query.push(", previous_state = ");
        delete_query.push_bind(entity.state.previous);
        delete_query.push("WHERE id = ");
        delete_query.push_bind(entity.id.get_id());
        delete_query
    }
}
