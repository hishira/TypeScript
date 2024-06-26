use sqlx::{Execute, Postgres, QueryBuilder};
use uuid::Uuid;

use crate::{
    api::{
        dtos::userdto::userdto::UserFilterOption,
        queries::{actionquery::ActionQueryBuilder, query::Query},
    },
    core::{address::address::Address, user::user::User},
};

#[derive(Clone)]
pub struct UserQuery {
    id: Option<Uuid>,
    username: Option<String>,
    email: Option<String>,
}

impl UserQuery {
    pub fn new(id: Option<Uuid>, user_name: Option<String>, email: Option<String>) -> Self {
        UserQuery {
            id,
            username: user_name,
            email: email,
        }
    }

    pub fn prepare_address_query(&self, address: Address, user_id: Uuid) -> QueryBuilder<Postgres> {
        let address_id = Uuid::new_v4(); // Address is value object, not necessery id
        let mut create_address_builder: QueryBuilder<Postgres> = QueryBuilder::new(
            "WITH first_insert as ( INSERT INTO ADDRESS(id, house, door, city, country, lat, long, postal_code, fax, phone) ",
        );

        create_address_builder.push_values(vec![address], |mut b, address| {
            b.push_bind(address_id)
                .push_bind(address.house)
                .push_bind(address.door)
                .push_bind(address.city)
                .push_bind(address.country)
                .push_bind(address.location.latitude)
                .push_bind(address.location.longitude)
                .push_bind(address.postal_code)
                .push_bind(address.fax)
                .push_bind(address.phone);
        });
        create_address_builder
            .push("returning id ) INSERT into ADDRESS_CONNECTION (entity_id, address_id) ");
        create_address_builder.push_values(
            std::iter::once((user_id, address_id)),
            |mut b, (user_id, address_id)| {
                b.push_bind(user_id).push_bind(address_id);
            },
        );

        create_address_builder
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
        let count: i8 = 0;
        if let Some(owner_id) = option.owner_id {
            user_query
                .push(" WHERE id in (select user_id from EMPLOYEE_CONNECTION where owner_id = ");
            user_query.push_bind(owner_id);
            user_query.push(") ");
        }
        UserQuery::prepare_username(&mut user_query, count, option.username.clone());
        user_query.push(" limit ");
        user_query.push_bind(option.limit.unwrap_or(10));
        user_query.push(" offset ");
        user_query.push_bind(option.offset.unwrap_or(0));
        user_query
    }

    fn find_by_id(id: uuid::Uuid) -> QueryBuilder<'static, Postgres> {
        let mut query_by_id: QueryBuilder<Postgres> =
            QueryBuilder::new("SELECT id, username, email, password, meta_id, role, current_state, previous_state  FROM users where id = ");
        query_by_id.push_bind(id);
        query_by_id
    }
}

impl ActionQueryBuilder<User> for UserQuery {
    fn create(entity: User) -> QueryBuilder<'static, Postgres> {
        let mut create_builder: QueryBuilder<Postgres> =
            QueryBuilder::new("INSERT INTO USERS(id, username, password, email, meta_id, role, first_name, last_name) ");
        create_builder.push_values(vec![entity], |mut b, user| {
            b.push_bind(user.id)
                .push_bind(user.username)
                .push_bind(user.password)
                .push_bind(user.email)
                .push_bind(user.meta.id)
                .push_bind(user.role)
                .push_bind(user.first_name)
                .push_bind(user.last_name);
        });
        create_builder.push(" RETURNING id, username, password, email;");
        create_builder
    }

    fn update(&self, entity: User) -> QueryBuilder<Postgres> {
        let mut update_query: QueryBuilder<Postgres> =
            QueryBuilder::new("UPDATE USERS SET username = ");
        update_query.push_bind(entity.username);
        update_query.push(", email = ");
        update_query.push_bind(entity.email);
        update_query.push(", password = ");
        update_query.push_bind(entity.password);
        update_query.push(", role = ");
        update_query.push_bind(entity.role);
        update_query.push(" WHERE id = ");
        update_query.push_bind(entity.id);

        update_query
    }

    fn delete(&self, entity: User) -> QueryBuilder<Postgres> {
        let mut delete_query: QueryBuilder<Postgres> =
            QueryBuilder::new("UPDATE USERS SET current_state = ");
        delete_query.push_bind(entity.state.current);
        delete_query.push(", previous_state = ");
        delete_query.push_bind(entity.state.previous);
        delete_query.push("WHERE id = ");
        delete_query.push_bind(entity.id);
        delete_query
    }
}

#[cfg(test)]
mod tests {
    use crate::core::{
        meta::meta::Meta,
        role::role::Roles,
        state::{entitystate::EntityState, state::State},
    };

    use super::*;

    fn validate_action_query(user_query: &UserQuery, entity: User) -> QueryBuilder<'static, Postgres> {
        UserQuery::create(entity)
    }

    // fn validate_update_action_query(user_query: &UserQuery, entity: User) -> String {
    //     user_query.update(entity)
    // }

    #[test]
    fn test_user_query_build_with_all_params() {
        let user_query = UserQuery::new(
            Some(Uuid::new_v4()),
            Some("username".to_string()),
            Some("email@example.com".to_string()),
        );

        let built_query = user_query.build();

        assert_eq!(
            built_query,
            "SELECT * FROM users where id = $1 AND username = $2 AND email = $3"
        );
    }

    #[test]
    fn test_user_query_build_with_username_only() {
        let user_query = UserQuery::new(None, Some("username".to_string()), None);

        let built_query = user_query.build();

        assert_eq!(built_query, "SELECT * FROM users where username = $1");
    }

    #[test]
    fn test_user_query_build_with_email_only() {
        let user_query = UserQuery::new(None, None, Some("email@example.com".to_string()));

        let built_query = user_query.build();

        assert_eq!(built_query, "SELECT * FROM users where email = $1");
    }

    #[test]
    fn test_user_query_build_with_no_params() {
        let user_query = UserQuery::new(None, None, None);

        let built_query = user_query.build();

        assert_eq!(built_query, "SELECT * FROM users where");
    }

    #[test]
    fn test_user_query_create() {
        let user_query = UserQuery::new(None, None, None);

        let test_user = User {
            id: Uuid::new_v4(),
            first_name: None,
            last_name: None,
            username: "test_user".to_string(),
            password: "password".to_string(),
            email: "test@example.com".to_string(),
            meta: Meta::new(),
            role: Roles::user_role(),
            address: None,
            managed_users: None,
            state: State {
                current: EntityState::Active,
                previous: None,
            },
        };

        let mut create_query = validate_action_query(&user_query, test_user);

        assert_eq!(
            create_query.build().sql().to_string(),
            "INSERT INTO USERS(id, username, password, email) VALUES ($1, $2, $3, $4)"
        );
    }
    // TODO: Check
    // #[test]
    // fn test_user_query_update() {
    //     // Create a UserQuery
    //     let user_query = UserQuery::new(None, None, None);

    //     // Create a User entity for testing
    //     let test_user = User {
    //         id: Uuid::new_v4(),
    //         username: "test_user".to_string(),
    //         password: "password".to_string(),
    //         email: "test@example.com".to_string(),
    //         recipies: None,
    //         meta: Meta::new(),
    //     };

    //     // Validate the built SQL query for updating
    //     let update_query = validate_update_action_query(&user_query, test_user.clone());

    //     // Assert that the built update query is correct
    //     assert_eq!(
    //         update_query,
    //         format!(
    //             "UPDATE USERS SET username = {}, email = {}, password = {} WHERE id = {}",
    //             test_user.username, test_user.email, test_user.password, test_user.id
    //         )
    //     );
    // }

    #[test]
    #[should_panic]

    fn test_user_query_delete() {
        let user_query = UserQuery::new(None, None, None);

        let test_user = User {
            id: Uuid::new_v4(),
            first_name: None,
            last_name: None,
            username: "test_user".to_string(),
            password: "password".to_string(),
            email: "test@example.com".to_string(),
            meta: Meta::new(),
            role: Roles::user_role(),
            address: None,
            managed_users: None,
            state: State {
                current: EntityState::Active,
                previous: None,
            },
        };

        let _ = user_query.delete(test_user);
    }
}
