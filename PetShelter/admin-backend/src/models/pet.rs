use crate::schema::pets;

#[derive(Identifiable, Queryable, Associations, PartialEq, Debug)]
#[diesel(belongs_to(User), foreign_key = "user_id")]
#[diesel(table_name = pets)]
pub struct Pet {
    id: Option<i32>,
    user_id: i32,
    name: String,
}
