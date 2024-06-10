use serde::{Deserialize, Serialize};

use super::user::User;

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Manager{
    pub user: User,
}