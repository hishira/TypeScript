table! {
    pets (id) {
        id -> Nullable<Integer>,
        user_id -> Integer,
        name -> Text,
    }
}

table! {
    users (id) {
        id -> Nullable<Integer>,
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