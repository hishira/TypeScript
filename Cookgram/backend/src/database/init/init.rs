use std::time::Duration;

use mongodb::{options::ClientOptions, Client, Database as MongoDatabase};
use sqlx::{postgres::PgPoolOptions, Executor, Pool, Postgres};

pub struct Database {
    url: String,
    pub pool: Option<Pool<Postgres>>,
    pub mongo_client: Client,
    mongo_database_name: String,
}

impl Database {
    pub async fn new() -> Self {
        let db_connection_string = dotenv::var("DATABASE_URL").unwrap();
        let psg_pool = Database::get_optional_pool(db_connection_string.clone()).await;
        let mut mongo_db_client = ClientOptions::parse(dotenv::var("MONGO_URL").unwrap())
            .await
            .unwrap();
        let mongo_client = Client::with_options(mongo_db_client).unwrap();
        let mongo_database_name = dotenv::var("MONGO_DATABASE_NAME").unwrap();
        Self {
            url: db_connection_string.to_string(),
            pool: psg_pool,
            mongo_client: mongo_client,
            mongo_database_name
        }
    }

    pub fn get_mongo_database(&self) -> MongoDatabase {
        self.mongo_client.database("db_p321")
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
            .max_connections(10)
            .acquire_timeout(Duration::from_secs(10))
            .connect(&database_url)
            .await
            .expect("can't connect to database");

        Option::Some(pool)
    }
}
