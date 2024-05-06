
export const RequiredErrors: ValidatorErrors = {
  required: {
    message: "Field is required",
  },
};
export const MinLengthErrors: (minLength: number) => ValidatorErrors = (
  minLength: number
) => ({
  minLength: {
    message: `Minimum length is ${minLength}`,
  },
});
export const SameValueError: (message?: string) => ValidatorErrors = (
  message?: string
) => ({
  saveValue: {
    message: message ?? "Values should be the same",
  },
});
export const EmailError: ValidatorErrors = {
  email: { message: "Email is incorrect" },
};
export const PasswordError: ValidatorErrors = {
  password: {
    message: "Password must contain at least 8 characters, has at least one big, small and speciall character.",
  },
};
