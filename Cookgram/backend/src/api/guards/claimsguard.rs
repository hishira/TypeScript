use crate::{
    api::{router::authrouter::AuthError, utils::jwt::jwt::Claims},
    core::role::{
        access::{Action, Queries, QueriesActions},
        role::Roles,
    },
};

pub struct ClaimsGuard {}

impl ClaimsGuard {
    pub fn role_guard_user_find(claims: Claims) -> Result<bool, AuthError> {
        let res_role = claims.role.ok_or(AuthError::MissingCredentials)?;
        let role = res_role;
        if !role.has_access_to(QueriesActions::Access(Queries::User, Action::View)) {
            return Err(AuthError::Unauthorized);
        }
        Ok(true)
    }

    pub fn user_delete_guard(claims: Claims) -> Result<bool, AuthError> {
        let res_role = claims.role.ok_or(AuthError::MissingCredentials)?;
        if !res_role.has_access_to(QueriesActions::Access(Queries::User, Action::Management)) {
            return Err(AuthError::Unauthorized);
        }
        Ok(true)
    }

    pub fn user_update_guard(claims: Claims) -> Result<bool, AuthError> {
        Self::self_management_guard(&claims)
    }

    pub fn manage_user_guard(claims: Claims) -> Result<bool, AuthError> {
        let res_role = claims.role.ok_or(AuthError::MissingCredentials)?;
        if !res_role.has_access_to(QueriesActions::Access(Queries::User, Action::Management)) {
            return Err(AuthError::Unauthorized);
        }
        Ok(true)
    }

    pub fn current_user_guard(claims: &Claims) -> Result<bool, AuthError> {
        Self::self_management_guard(&claims)
    }

    fn self_management_guard(claims: &Claims) -> Result<bool, AuthError> {
        let res_role = claims.role.as_ref().ok_or(AuthError::MissingCredentials)?;
        if !res_role.has_access_to(QueriesActions::Access(
            Queries::User,
            Action::SelfManagement,
        )) {
            return Err(AuthError::Unauthorized);
        }
        Ok(true)
    }
}
