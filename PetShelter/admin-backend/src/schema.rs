
table! {
    meta (id) {
        id -> Integer,
        create_date -> diesel::sql_types::Timestamp,
        edit_date -> diesel::sql_types::Timestamp,
    }
}

table! {
    pettypes (id) {
        id -> Integer,
        value -> Text,
        visible -> Bool,
        meta_id -> Integer,
    }
}

table! {
    pets (id) {
        id -> Integer,
        user_id -> Integer,
        pettype_id -> Integer,
        name -> Text,
        meta_id -> Integer,
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
        meta_id -> Integer,
    }
}

table! {
    addresses (id) {
        id -> Integer,
        country -> Text,
        city -> Text,
        lt -> Double,
        lng -> Double,
        street -> Text,
        housenumber -> Text,
        meta_id -> Integer,
    }
}

table! {
    shelters (id) {
        id -> Integer,
        name -> Text,
        phone_number -> Text,
        email -> Text,
        user_id -> Integer,
        address_id -> Integer,
        meta_id -> Integer,
    }
}

joinable!(pets -> users (user_id));
joinable!(shelters -> users (user_id));
joinable!(shelters -> addresses (address_id));
joinable!(pets -> pettypes (pettype_id));
joinable!(users -> meta (meta_id));
joinable!(shelters -> meta (meta_id));
joinable!(pets -> meta (meta_id));
joinable!(addresses -> meta (meta_id));
joinable!(pettypes -> meta (meta_id));

allow_tables_to_appear_in_same_query!(
    pets,
    users,
    pettypes
);

allow_tables_to_appear_in_same_query!(
    shelters,
    addresses,
    users,
);
