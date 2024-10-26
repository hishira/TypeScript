use uuid::Uuid;

pub trait Entity: Send + Sync{
    fn generate_id() -> impl IdGenerator;
}

pub trait IdGenerator: Send + Sync {
    fn get_id(&self) -> Uuid;
}