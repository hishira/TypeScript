pub enum AuthenticationQueryTypes {
   InsertIntoAuthentication,
   SelectFromUserLogin,
   SelectFromUserLoginWhereId
}

impl Into<String> for AuthenticationQueryTypes {
    fn into(self) -> String {
        match self {
            AuthenticationQueryTypes::InsertIntoAuthentication => "INSERT INTO AUTHENTICATION(user_id, username, password, passowrd_is_temporary) ".to_string(),
            AuthenticationQueryTypes::SelectFromUserLogin => "SELECT * FROM USERLOGIN WHERE current_state = 'Active'".to_string(),
            AuthenticationQueryTypes::SelectFromUserLoginWhereId => "SELECT * FROM USERLOGIN WHERE id =  ".to_string(),
        }
    }
}