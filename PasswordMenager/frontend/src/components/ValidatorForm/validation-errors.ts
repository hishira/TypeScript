import i18next from "i18next";
import i18n from "../../i18n";

import { TranslationFunction } from "../Translation";
// import i18n from "i18next";
export const RequiredErrors: () => ValidatorErrors = () => {
  const text = i18next.t("validation.errors.required");
  return {
    required: {
      message: text,
    },
  };
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
    message:
      "Password must contain at least 8 characters, has at least one big, small and speciall character.",
  },
};
