use bb8::Pool;
use bb8_redis::bb8;
use bb8_redis::RedisConnectionManager;

#[derive(Clone)]
pub struct RedisDatabase {
    pub pool: Pool<RedisConnectionManager>,
}

impl RedisDatabase {
    pub async fn connect() -> Self {
        let manager = RedisConnectionManager::new(dotenv::var("REDIS_URL").unwrap()).unwrap();
        let pool = bb8::Pool::builder().build(manager).await.unwrap();
        Self { pool }
    }
}
