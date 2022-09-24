use core::fmt;
use std::fmt::{Debug, write};

use diesel::backend::Backend;
use diesel::sql_types::Text;
use rocket::serde::{ Deserialize, Serialize};
use diesel::deserialize::{self, FromSql};
use diesel::serialize::{self, ToSql, Output, IsNull};
use sqlx::sqlite::SqliteValue;
use diesel::sqlite::Sqlite;
//#[derive(SqlType)]
//pub struct MyType;


//#[derive(Debug, Copy, Clone, AsExpression, FromSqlRow)]
//#[diesel(sql_type = MyType)]

//TODO think of better implementetion, not string
// but seperate enum struct for User table
pub enum Role{
    Admin,
    User,
}

impl fmt::Display for Role {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Role::Admin =>write!(f, "Admin"),
            Role::User =>write!(f,"User")
        }
    }
}

impl Role {
    pub fn UserRole() -> String {
        Role::User.to_string()
    }

    pub fn AdminRole() -> String {
        Role::Admin.to_string()
    }
}
//impl ToSql<MyType, Sqlite> for Role{
//    fn to_sql<W: std::io::Write>(&self, out: &mut Output<W, Sqlite>) -> serialize::Result {
//        match *self {
//            Role::Admin => out.write_all(b"Admin")?,
//            Role::User  => out.write_all(b"User")?,
//        }
//        Ok(IsNull::No)
//    }
//}

//impl FromSql<MyType, Sqlite> for Role
////where
////    DB: Backend,
////    String: FromSql<MyType, DB>,
//{
//    fn from_sql(bytes:SqliteValue) -> deserialize::Result<Self> {
//        match bytes {
//            b"Admin" => Ok(Role::Admin),
//            b"User" => Ok(Role::User),
//            _ => Err("Erro role"),
//        }
//    }
//}