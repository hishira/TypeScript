use std::time::Duration;

use sqlx::{postgres::PgPoolOptions, Executor, Pool, Postgres};

pub struct Database {
    url: String,
    pool: Option<Pool<Postgres>>,
}

impl Database {
    pub async fn new() -> Self {
        let db_connection_string = dotenv::var("DATABASE_URL").unwrap();
        let psg_pool = Database::get_optional_pool(db_connection_string.clone()).await;
        Self {
            url: db_connection_string.to_string(),
            pool: psg_pool,
        }
    }

    pub async fn prepare_tables(&self) {
        match &self.pool {
            Some(pool) => {
                let table_resultt = pool.execute(include_str!("../schema.sql")).await;
                match table_resultt {
                    Ok(r) => {
                        println!("{}", r.rows_affected())
                    }
                    Err(error) => println!("{}", error.to_string()),
                };
            }
            None => println!("There are no pool defined"),
        }
    }
    async fn get_optional_pool(database_url: String) -> Option<Pool<Postgres>> {
        let pool = PgPoolOptions::new()
            .max_connections(5)
            .acquire_timeout(Duration::from_secs(3))
            .connect(&database_url)
            .await
            .expect("can't connect to database");
    
        Option::Some(pool)
    }
}


