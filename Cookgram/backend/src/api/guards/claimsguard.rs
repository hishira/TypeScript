use crate::{
    api::{dtos::roledto::roledto::map_to_roles, errors::autherror::AuthError, utils::jwt::jwt::Claims},
    core::role::access::{Action, Queries, QueriesActions},
};

pub struct ClaimsGuard {}

impl ClaimsGuard {
    fn is_unauthorized_to_take_action() -> Result<bool, AuthError> {
        tracing::info!("User are unauthorize to take action");
        Err(AuthError::Unauthorized)
    }

    pub fn role_guard_user_find(claims: Claims) -> Result<bool, AuthError> {
        let res_role = claims.role.map(map_to_roles).ok_or(AuthError::MissingCredentials)?;
        let role = res_role;
        if !role.has_access_to(QueriesActions::Access(Queries::User, Action::View)) {
            return Self::is_unauthorized_to_take_action();
        }
        Ok(true)
    }

    pub fn user_delete_guard(claims: Claims) -> Result<bool, AuthError> {
        let res_role = claims.role.map(map_to_roles).ok_or(AuthError::MissingCredentials)?;
        if !res_role.has_access_to(QueriesActions::Access(Queries::User, Action::Management)) {
            return Self::is_unauthorized_to_take_action();
        }
        Ok(true)
    }

    pub fn user_update_guard(claims: Claims) -> Result<bool, AuthError> {
        Self::self_management_guard(&claims)
    }

    pub fn manage_user_guard(claims: Claims) -> Result<bool, AuthError> {
        let res_role = claims.role.map(map_to_roles).ok_or(AuthError::MissingCredentials)?;
        if !res_role.has_access_to(QueriesActions::Access(Queries::User, Action::Management)) {
            return Self::is_unauthorized_to_take_action();
        }
        Ok(true)
    }

    pub fn current_user_guard(claims: &Claims) -> Result<bool, AuthError> {
        Self::self_management_guard(&claims)
    }

    fn self_management_guard(claims: &Claims) -> Result<bool, AuthError> {
        let binding = claims.role.clone().map(map_to_roles);
        let res_role = binding.as_ref().ok_or(AuthError::MissingCredentials)?;
        if !res_role.has_access_to(QueriesActions::Access(
            Queries::User,
            Action::SelfManagement,
        )) {
            return Self::is_unauthorized_to_take_action();
        }
        Ok(true)
    }
}
