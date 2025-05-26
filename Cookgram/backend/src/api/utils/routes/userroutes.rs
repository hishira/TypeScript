pub struct UserRoutes;

impl UserRoutes {
    pub const USERS: &'static str = "/users";
    pub const PROTECTED: &'static str = "/protected";
    pub const UPDATE_USER: &'static str = "/update-user";
    pub const USER_DETAILS: &'static str = "/user/:id";
    pub const DELETE_USER: &'static str = "/delete-user";
    pub const ADD_USER: &'static str = "/add-user";
    pub const CURRENT_USER: &'static str = "/current-user";
    pub const GET_MANAGED_USERS: &'static str = "/get-managed-users";
    pub const TEST_PROTECTED: &'static str = "/test-protected";
    pub const ADDRESS_CREATE: &'static str = "/address-create";
    pub const ADDRESS_UPDATE: &'static str = "/address-update/:entity_id";
    pub const USER_LIST: &'static str = "/user-list";
    pub const TEST_EVENT: &'static str = "/test-event";
}
