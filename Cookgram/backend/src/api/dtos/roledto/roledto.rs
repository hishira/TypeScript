use crate::core::role::role::Roles;

#[derive(sqlx::Type)]
#[sqlx(type_name = "Role")]
pub enum RoleDto {
    User,
    Admin,
    SuperAdmin,
}

impl RoleDto {
    pub fn map_to_roles(self) -> Roles {
        RoleDto::get_role(self)
    }
    
    pub fn get_role(dto_role: RoleDto) -> Roles {
        match dto_role {
            RoleDto::User => Roles::user_role(),
            RoleDto::Admin => Roles::admin_role(),
            RoleDto::SuperAdmin => Roles::super_admin_role(),
        }
    }
}