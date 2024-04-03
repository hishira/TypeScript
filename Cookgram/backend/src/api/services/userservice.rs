use crate::{api::dtos::userdto::userdto::UserDtos, core::user::user::User};

pub struct UserService {}

impl UserService {
    pub fn get_user_from_dto(user_dto: UserDtos) -> User {
        match user_dto {
            UserDtos::Create(user) => {
                User::new(None, user.username, user.password, user.email, None)
            }
            UserDtos::Update(user) => {
                User::new(None, user.username, user.password, user.email, None)
            }
        }
    }
}
