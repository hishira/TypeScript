import i18next from "i18next";
import i18n from "../../i18n";

import { TranslationFunction } from "../Translation";
// import i18n from "i18next";
export const RequiredErrors: () => ValidatorErrors = () => {
  const message = i18next.t("validation.errors.required");
  return {
    required: {
      message,
    },
  };
};
export const MinLengthErrors: (minLength: number) => () => ValidatorErrors =
  (minLength: number) => () => {
    const message = i18next.t("validation.errors.minLength", {
      length: minLength,
    });
    return {
      minLength: {
        message,
      },
    };
  };
export const SameValueError: (message?: string) => () => ValidatorErrors =
  (message?: string) => () => {
    return {
      saveValue: {
        message: message ?? i18next.t("validation.errors.sameValue"),
      },
    };
  };
export const EmailError: () => ValidatorErrors = () => {
  return { email: { message: i18next.t("validation.errors.email") } };
};
export const PasswordError: () => ValidatorErrors = () => {
  return {
    password: {
      message: i18next.t("validation.errors.password"),
    },
  };
};
