use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use uuid::Uuid;

use crate::core::{entity::{entity::IdGenerator, Entity}, state::state::State};

use super::ticketid::TicketId;

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq)]
pub enum TicketState {
    New,
    Bug,
    CannotResolve,
    Resolved,
}

#[derive(Debug, Deserialize, Serialize, PartialEq)]
pub enum TicketType {
    Bug,
    ServerError,
    ProblemWithAccount,
    ContractProblem,
}
#[derive(Debug, Serialize, Deserialize, PartialEq)]
pub struct Ticket {
    pub id: TicketId,
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

impl Entity for Ticket {
    fn generate_id() -> impl IdGenerator {
        TicketId::default()
    }
}

impl Ticket {
    pub fn resolve_ticket(&mut self) {
        self.state.previous = Some(self.state.current.clone());
        self.state.current = TicketState::Resolved;
        self.set_resolve_time();
    }

    pub fn cannot_resolve_ticket(&mut self) {
        self.state.previous = Some(self.state.current.clone());
        self.state.current = TicketState::CannotResolve;
        self.set_resolve_time();
    }
    fn set_resolve_time(&mut self) {
        self.resolve_time = OffsetDateTime::now_utc();
        self.edit_date = OffsetDateTime::now_utc();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use time::OffsetDateTime;
    use uuid::Uuid;

    #[test]
    fn test_resolve_ticket() {
        let initial_time = OffsetDateTime::now_utc();

        let mut ticket = Ticket {
            id: TicketId::default(),
            owner_id: Uuid::new_v4(),
            sender_id: Uuid::new_v4(),
            title: String::from("Issue with account"),
            content: String::from("Cannot login to my account."),
            create_time: initial_time,
            edit_date: initial_time,
            resolve_time: initial_time,
            state: State {
                current: TicketState::New,
                previous: None,
            },
            ticket_type: TicketType::ProblemWithAccount,
        };

        ticket.resolve_ticket();

        assert_eq!(ticket.state.current, TicketState::Resolved);
        assert_eq!(ticket.state.previous, Some(TicketState::New));
        assert!(ticket.resolve_time > initial_time);
    }

    #[test]
    fn test_cannot_resolve_ticket() {
        let initial_time = OffsetDateTime::now_utc();

        let mut ticket = Ticket {
            id: TicketId::default(),
            owner_id: Uuid::new_v4(),
            sender_id: Uuid::new_v4(),
            title: String::from("Issue with account"),
            content: String::from("Cannot login to my account."),
            create_time: initial_time,
            edit_date: initial_time,
            resolve_time: initial_time,
            state: State {
                current: TicketState::New,
                previous: None,
            },
            ticket_type: TicketType::ProblemWithAccount,
        };

        ticket.cannot_resolve_ticket();

        assert_eq!(ticket.state.current, TicketState::CannotResolve);
        assert_eq!(ticket.state.previous, Some(TicketState::New));
        assert!(ticket.resolve_time > initial_time);
    }
}
