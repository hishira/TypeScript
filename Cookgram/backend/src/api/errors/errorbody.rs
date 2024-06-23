use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ErrorStruct {
    message: String
}

#[derive(Serialize, Deserialize, Debug)]
pub enum ErrorBody<T>{
    Ok(T),
    Error(ErrorStruct)
}
