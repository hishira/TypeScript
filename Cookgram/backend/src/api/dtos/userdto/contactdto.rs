use serde::{Deserialize, Serialize};

#[derive(PartialEq, Debug, Clone, Deserialize, Serialize)]
pub struct ContactDTO {
    pub email: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
}