use core::fmt;

pub enum UserRepoMessages {
    MetaAndUserCreate,
    UserCreateMetaNot,
    UserNotCreateMetaCreate,
    UserAndMetaNotCreate,
    UserAddressCreate,
    UserAddressNotCreate,
    AddressCreate,
    AddressNotCreate,
    UserNotCreate,
    UserNotDelete,
    UserWithIDUpdate,
    UserWithIDNotUpdate,
    MetaObjectCreate,
    MetaObjectNotCreate,
    MetaObjectUpdate,
    MetaObjectNotUpdate,
}

impl UserRepoMessages {
    pub fn as_str(&self) -> &str {
        match self {
            UserRepoMessages::MetaAndUserCreate => "Meta and user created",
            UserRepoMessages::UserCreateMetaNot => "User created, meta not created, error",
            UserRepoMessages::UserNotCreateMetaCreate => "User not created, meta created => error:",
            UserRepoMessages::UserAndMetaNotCreate => "Meta and user not created, error",
            UserRepoMessages::UserAddressCreate => "User address created",
            UserRepoMessages::UserAddressNotCreate => "Error occur while saving user address",
            UserRepoMessages::AddressCreate => "Address created",
            UserRepoMessages::AddressNotCreate => "Error while address create",
            UserRepoMessages::UserNotCreate => "Error occur while user create",
            UserRepoMessages::UserNotDelete => "Error while user delete",
            UserRepoMessages::UserWithIDUpdate => "User with id updated",
            UserRepoMessages::UserWithIDNotUpdate => "User with id not updated",
            UserRepoMessages::MetaObjectCreate => "Meta object created",
            UserRepoMessages::MetaObjectNotCreate => "Meta object not created",
            UserRepoMessages::MetaObjectUpdate => "Meta object update",
            UserRepoMessages::MetaObjectNotUpdate => "Meta object not update",
        }
    }
}

impl fmt::Display for UserRepoMessages {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.as_str())
    }
}