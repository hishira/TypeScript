pub struct AddressRepoMessages;

impl AddressRepoMessages {
    pub const ADDRESS_CREATE_SUCCESS: &'static str = "Address created successfully";
    pub const ADDRESS_CREATE_FAIL: &'static str = "Failed to create address: {}";

    pub const ADDRESS_FIND_SUCCESS: &'static str = "Addresses found successfully";
    pub const ADDRESS_FIND_FAIL: &'static str = "Failed to find addresses: {}";

    pub const ADDRESS_FIND_BY_ID_SUCCESS: &'static str = "Address found successfully";
    pub const ADDRESS_FIND_BY_ID_FAIL: &'static str = "Failed to find address: {}";
    pub const ADDRESS_NOT_FOUND: &'static str = "Address not found";

    pub const ADDRESS_DELETE_SUCCESS: &'static str = "Address deleted successfully";
    pub const ADDRESS_DELETE_FAIL: &'static str = "Failed to delete address: {}";

    pub const ADDRESS_UPDATE_SUCCESS: &'static str = "Address updated successfully";
    pub const ADDRESS_UPDATE_FAIL: &'static str = "Failed to update address: {}";
}
