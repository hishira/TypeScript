
export enum AuthError {
  ValidateUserNotExists = 'User not exists',
  ValidateUserNotExistsWrongPassword = 'User try to log into system, passowrd not match',
  ValidateUserNotExistsContext = 'Auth service: validateUser method',
  CreateUserEventEmit = 'Emit create user event',
  CreateUserContext = 'User service: createUser method'
}
