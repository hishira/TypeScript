use crate::core::address::address::Address;
use super::dao::SmallDAO;
use mongodb::Database;
use sqlx::{postgres::PgQueryResult, Executor, Pool, Postgres, QueryBuilder};
use uuid::Uuid;
use async_trait::async_trait;
use sqlx::Row;

#[derive(Clone)]
pub struct AddressDAO {
    pub pool: Pool<Postgres>,
    pub db_context: Database,
}

// TODO: Move UserFilterOption to AddressFilterOption

#[async_trait]
impl SmallDAO<Address> for AddressDAO {
    async fn create<'a, E>(
        &self,
        entity: Address,
        executor: Option<E>,
    ) -> Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send,
    {
        let address_id = Uuid::new_v4();
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("INSERT INTO ADDRESS(id, address, house, door, city, country, lat, long, postal_code) ");

        query_builder.push_values(vec![entity], |mut b, address| {
            b.push_bind(address_id)
                .push_bind(address.address)
                .push_bind(address.house)
                .push_bind(address.door)
                .push_bind(address.city)
                .push_bind(address.country)
                .push_bind(address.location.latitude)
                .push_bind(address.location.longitude)
                .push_bind(address.postal_code);
        });

        match executor {
            Some(exec) => query_builder.build().execute(exec).await,
            None => query_builder.build().execute(&self.pool).await,
        }
    }

    async fn find(&self, _: ()) -> Result<Vec<Address>, sqlx::Error> {
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("SELECT id, address, house, door, city, country, lat, long, postal_code FROM ADDRESS");

        let result = query_builder
            .build()
            .fetch_all(&self.pool)
            .await?;

        Ok(result
            .into_iter()
            .map(|row| Address::new(
                row.get("address"),
                row.get("house"),
                row.get("door"),
                row.get("city"),
                row.get("country"),
                crate::core::address::location::Location {
                    latitude: row.get("lat"),
                    longitude: row.get("long"),
                },
                row.get("postal_code"),
            ))
            .collect())
    }

    async fn find_by_id(&self, id: Uuid) -> Result<Address, sqlx::Error> {
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("SELECT id, address, house, door, city, country, lat, long, postal_code FROM ADDRESS WHERE id = ");
        
        query_builder.push_bind(id);

        let row = query_builder
            .build()
            .fetch_one(&self.pool)
            .await?;

        Ok(Address::new(
            row.get("address"),
            row.get("house"),
            row.get("door"),
            row.get("city"),
            row.get("country"),
            crate::core::address::location::Location {
                latitude: row.get("lat"),
                longitude: row.get("long"),
            },
            row.get("postal_code"),
        ))
    }

    async fn delete(&self, entity: Address) -> Result<PgQueryResult, sqlx::Error> {
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("DELETE FROM ADDRESS WHERE id = ");
            
        // TODO: Thinkof of id
        //query_builder.push_bind(entity.id.get_id());

        query_builder.build().execute(&self.pool).await
    }
}

impl AddressDAO {
    pub fn new(pool: Pool<Postgres>, db_context: Database) -> Self {
        Self { pool, db_context }
    }

    pub async fn update(&self, entity: Address) -> Result<PgQueryResult, sqlx::Error> {
        let mut query_builder: QueryBuilder<Postgres> = 
            QueryBuilder::new("UPDATE ADDRESS SET ");

                // TODO: Thinkof of id
  
        query_builder
            .push("address = ")
            .push_bind(entity.address.clone())
            .push(", house = ")
            .push_bind(entity.house.clone())
            .push(", door = ")
            .push_bind(entity.door.clone())
            .push(", city = ")
            .push_bind(entity.city.clone())
            .push(", country = ")
            .push_bind(entity.country.clone())
            .push(", lat = ")
            .push_bind(entity.location.latitude)
            .push(", long = ")
            .push_bind(entity.location.longitude)
            .push(", postal_code = ")
            .push_bind(entity.postal_code.clone())
            .push(" WHERE id = ");
//            .push_bind(entity.id.get_id());

        query_builder.build().execute(&self.pool).await
    }
}
