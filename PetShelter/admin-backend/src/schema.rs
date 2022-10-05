table! {
    pets (id) {
        id -> Integer,
        user_id -> Integer,
        name -> Text,
    }
}

table! {
    users (id) {
        id -> Integer,
        name -> Nullable<Text>,
        last_name -> Nullable<Text>,
        email -> Text,
        password -> Text,
        role -> Text,
    }
}

joinable!(pets -> users (user_id));

allow_tables_to_appear_in_same_query!(
    pets,
    users,
);