use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::{entity::Entity, state::state::State};

#[derive(Debug, Deserialize, Serialize)]
pub enum TicketState {
    New,
    Bug,
    CannotResolve,
    Resolved,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum TicketType {
    Bug,
    ServerError,
    ProblemWithAccount,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct Ticket {
    pub id: Uuid,
    pub owner_id: Uuid,
    pub sender_id: Uuid,
    pub title: String,
    pub content: String,
    pub create_time: OffsetDateTime,
    pub edit_date: OffsetDateTime,
    pub resolve_time: OffsetDateTime,
    pub state: State<TicketState>,
    pub ticket_type: TicketType,
}

impl Entity for Ticket{
    fn generate_id() -> Uuid {
        uuid::Uuid::new_v4()
    }
}