use uuid::Uuid;
use crate::core::{
    address::address::Address,
    entity::{entity::IdGenerator, Entity},
    meta::meta::Meta,
    role::role::Roles,
    state::{entitystate::EntityState, state::State},
};
use super::{credentials::Credentials, personalinformation::PersonalInformation, userid::UserId};

#[derive(PartialEq, Debug, Clone)]
pub struct User {
    pub id: UserId,
    pub personal_information: PersonalInformation,
    pub credentials: Credentials,
    pub address: Option<Address>,
    pub meta: Meta,
    pub role: Roles,
    pub state: State<EntityState>,
}

impl Entity for User {
    fn generate_id() -> impl IdGenerator {
        UserId::default()
    }
}

impl User {
    pub fn new(
        id: Option<Uuid>,
        personal_information: PersonalInformation,
        credentials: Credentials,
        role: Option<Roles>,
        meta: Option<Meta>,
        address: Option<Address>,
    ) -> Self {
        let user_role: Roles = Roles::prepare_proper_role(role);
        match id {
            Some(id) => Self {
                id: UserId::from_id(id),
                personal_information,
                credentials,
                meta: meta.unwrap_or(Meta::new()),
                role: user_role,
                address: address,
                state: State {
                    current: EntityState::Active,
                    previous: None,
                },
            },
            None => Self {
                id: UserId::from_id(User::generate_id().get_id()),
                personal_information,
                credentials,
                meta: Meta::new(),
                role: user_role,
                address: address,
                state: State {
                    current: EntityState::Active,
                    previous: None,
                },
            },
        }
    }

    pub fn create_base_on_user_and_address(user: User, address: Address) -> User {
        User {
            address: Some(address),
            ..user
        }
    }
}

