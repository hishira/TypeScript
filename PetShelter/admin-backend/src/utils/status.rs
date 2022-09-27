use rocket::response::{status};
use rocket::http::Status;
use rocket::serde::json::Json;

type OptionalStatus<T> = status::Custom<Json<Option<T>>>;

pub struct ResponseStatus;

impl ResponseStatus {

    #[allow(non_snake_case)]
    pub fn Forbidder_Empty_Json<T>() -> OptionalStatus<T> {
        status::Custom(Status::Forbidden, Json(None))
    } 

    #[allow(non_snake_case)]
    pub fn Ok<T>(json_data: Option<T>) -> OptionalStatus<T> {
        status::Custom(Status::Ok, Json(json_data))
    }

    #[allow(non_snake_case)]
    pub fn Not_Found<T>() ->  OptionalStatus<T> {
        status::Custom(Status::NotFound, Json(None))
    }
}

