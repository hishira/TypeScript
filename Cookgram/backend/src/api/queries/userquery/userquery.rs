use sqlx::{Execute, Postgres, QueryBuilder};
use uuid::Uuid;

use crate::api::queries::query::Query;

pub struct UserQuery{
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

    fn prepare_username(user_query: &mut QueryBuilder<Postgres>, mut count: i8, username: Option<String>) {
        if let Some(user_name) = username {
            if count > 0 {
                user_query.push(" AND username = ");
                user_query.push_bind(user_name);
                count+=1;
            } else {
                user_query.push(" username = ");
                user_query.push_bind(user_name);
                count+=1;
            }
        }
    }
    
    fn prepare_email(user_query: &mut QueryBuilder<Postgres>, mut count: i8, email: Option<String>) {
        if let Some(email) = email {
            if count > 0 {
                user_query.push(" AND email = ");
                user_query.push_bind(email);
                count+=1;
            } else {
                user_query.push(" email = ");
                user_query.push_bind(email);
                count+=1;
            }
        }
    }
}

impl Query for UserQuery {
    fn build(&self) -> String {
        let mut user_query: QueryBuilder<Postgres> = QueryBuilder::new("SELECT * FROM users where");
        let mut count: i8 = 0;
        if let Some(id) = self.id {
            user_query.push(" id = ");
            count+=1;
            user_query.push_bind(id.to_string());
        }
        UserQuery::prepare_username(&mut user_query, count, self.username.clone());
        UserQuery::prepare_email(&mut user_query, count, self.email.clone());
        user_query.build().sql().to_string()
    }
}


#[cfg(test)]
mod tests {
    use super::*;

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
}

