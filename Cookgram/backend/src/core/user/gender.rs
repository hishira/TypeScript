#[derive(PartialEq, Debug, Clone, sqlx::Type)]
#[sqlx(type_name = "Gender")]
pub enum Gender {
    Man,
    Woman,
    None,
}