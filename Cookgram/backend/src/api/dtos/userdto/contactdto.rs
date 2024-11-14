use serde::Deserialize;

#[derive(PartialEq, Debug, Clone, Deserialize)]
pub struct ContactDTO {
    pub email: Option<String>,
    pub phone: Option<String>,
    pub fax: Option<String>,
}