use serde::{Deserialize, Serialize};

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Contacts {
    pub email: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
}

impl Contacts {
    pub fn empty() -> Self {
        Self {
            email: None,
            fax: None,
            phone: None,
        }
    }
}
