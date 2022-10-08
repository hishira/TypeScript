

table! {
    pettypes (id) {
        id -> Integer,
        value -> Text,
        visible -> Bool,
    }
}

table! {
    pets (id) {
        id -> Integer,
        user_id -> Integer,
        pettype_id -> Integer,
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

table! {
    addresses (id) {
        id -> Integer,
        country -> Text,
        city -> Text,
        lt -> Double,
        lng -> Double,
        street -> Text,
        housenumber -> Text,
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
    }
}

joinable!(pets -> users (user_id));
joinable!(shelters -> users (user_id));
joinable!(shelters -> addresses (address_id));
joinable!(pets -> pettypes (pettype_id));

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
