export const IsUserPasswordNotDefined = (
  password: string | undefined | null
): boolean => password === null || password === undefined || password === "";

export const IsImportPasswordDefined = (
  importPassword: string | undefined | null
): boolean =>
  importPassword !== null &&
  importPassword !== undefined &&
  importPassword !== "";

export const GetPartialDefinedField = (
  { email, importPassword, login, password }: Partial<UserUpdate>,
  isPasswordNotDefined: boolean,
  isImportPasswordDefined: boolean
): UserUpdate => ({
  login,
  email,
  ...(!isPasswordNotDefined && { password: password }),
  ...(isImportPasswordDefined && { importPassword }),
});
