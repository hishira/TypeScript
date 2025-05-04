use std::fmt::Display;

#[derive(Clone)]
pub enum UserQueryType {
    SelectWhere,
    SeleFromAddressUsers,
    WhereInCondition,
    AndRoneNotInCondition,
    WheReoleNotInCondition,
    Limit,
    Offset,
    InsertIntoUsers,
} 

impl Into<String> for UserQueryType {
    fn into(self) -> String {
        match self {
            UserQueryType::SelectWhere => "SELECT * FROM users where".to_string(),
            UserQueryType::SeleFromAddressUsers => "SELECT * FROM ADDRESSUSERS".to_string(),
            UserQueryType::WhereInCondition => " WHERE id in (select user_id from EMPLOYEE_CONNECTION where owner_id = ".to_string(),
            UserQueryType::AndRoneNotInCondition => " AND role not in ('Admin', 'SuperAdmin') ".to_string(),
            UserQueryType::WheReoleNotInCondition => " where role not in ('Admin', 'SuperAdmin') ".to_string(),
            UserQueryType::Limit => " limit ".to_string(),
            UserQueryType::Offset => " offset ".to_string(),
            UserQueryType::InsertIntoUsers => "INSERT INTO USERS(id, email, meta_id, role, first_name, last_name) ".to_string(),
        }
    }
}

impl Display for UserQueryType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match *self {
            UserQueryType::SelectWhere => write!(f, "SELECT * FROM users where"),
            UserQueryType::SeleFromAddressUsers => write!(f, "SELECT * FROM ADDRESSUSERS"),
            UserQueryType::WhereInCondition => write!(f, " WHERE id in (select user_id from EMPLOYEE_CONNECTION where owner_id = "),
            UserQueryType::AndRoneNotInCondition => write!(f, " AND role not in ('Admin', 'SuperAdmin') "),
            UserQueryType::WheReoleNotInCondition => write!(f, " where role not in ('Admin', 'SuperAdmin') "),
            UserQueryType::Limit => write!(f, " limit "),
            UserQueryType::Offset =>  write!(f, " offset "),
            UserQueryType::InsertIntoUsers => write!(f, "INSERT INTO USERS(id, email, meta_id, role, first_name, last_name) "),
        }
    }
}