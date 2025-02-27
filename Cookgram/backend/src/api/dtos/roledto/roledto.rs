use crate::core::role::role::Roles;

#[derive(sqlx::Type)]
#[sqlx(type_name = "Role")]
pub enum RoleDto {
    User,
    Admin,
    SuperAdmin,
    Employee,
    Manager,
    Director
}

pub fn map_to_roles(role: RoleDto) -> Roles {
    get_role(role)
}

pub fn get_role(dto_role: RoleDto) -> Roles {
    match dto_role {
        RoleDto::User => Roles::user_role(),
        RoleDto::Admin => Roles::admin_role(),
        RoleDto::SuperAdmin => Roles::super_admin_role(),
        RoleDto::Employee => Roles::employee_role(),
        RoleDto::Manager => Roles::manager_role(),
        RoleDto::Director => Roles::director_role(),
    }
}
