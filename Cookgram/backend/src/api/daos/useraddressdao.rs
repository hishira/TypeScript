use crate::core::address::address::Address;
use mongodb::Database;
use sqlx::{postgres::PgQueryResult, Executor, Pool, Postgres, QueryBuilder};
use uuid::Uuid;

#[derive(Clone)]
pub struct UserAddressDAO {
    pub pool: Pool<Postgres>,
    pub db_context: Database,
}

impl UserAddressDAO {
    const START_ADDRESS_QUERY: &'static str = "WITH first_insert as ( INSERT INTO ADDRESS(id, address, house, door, city, country, lat, long, postal_code ) ";
    const RETURN_AND_ADDRESS_CONNECTION: &'static str =
        "returning id ) INSERT into ADDRESS_CONNECTION (entity_id, address_id) ";

    pub async fn create<'a, E>(
        &self,
        entity: Address,
        user_id: Uuid,
        executor: Option<E>,
    ) -> Result<PgQueryResult, sqlx::Error>
    where
        E: Executor<'a, Database = Postgres> + Send,
    {
        let address_id = Uuid::new_v4();
        let mut create_address_builder: QueryBuilder<Postgres> =
            QueryBuilder::new(Self::START_ADDRESS_QUERY);

        create_address_builder.push_values(vec![entity], |mut b, address| {
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
        create_address_builder.push(Self::RETURN_AND_ADDRESS_CONNECTION);
        create_address_builder.push_values(
            std::iter::once((user_id, address_id)),
            |mut b, (user_id, address_id)| {
                b.push_bind(user_id).push_bind(address_id);
            },
        );
        match executor {
            Some(exec) => create_address_builder.build().execute(exec).await,
            _ => create_address_builder.build().execute(&self.pool).await,
        }
    }
}
