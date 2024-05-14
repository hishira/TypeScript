import {
  RequiredErrors,
  MinLengthErrors,
  SameValueError,
  EmailError,
  PasswordError,
} from "./validation-errors";
type Undefined = undefined | null | "";
const IsUndefined = (value: unknown): value is Undefined =>
  value === undefined || value === null || value === "" || value === void 0;
const PASSWORD_REGEXP: RegExp =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
const EMAIL_REGEXP: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export namespace Validators {
  export const Required: ValidatorFn = (value: unknown): ValidatorErrors => {
    return IsUndefined(value) ? RequiredErrors : null;
  };

  export const MinLength: (minLength: number) => ValidatorFn =
    (minLength: number): ValidatorFn =>
    (value: unknown) => {
      const IsString = typeof value === "string";
      if (IsString && value.length < minLength)
        return MinLengthErrors(minLength);
      return IsString && value.length >= minLength
        ? null
        : MinLengthErrors(minLength);
    };

  export const SaveValue: (
    valueToCompare: unknown,
    message?: string
  ) => ValidatorFn =
    (valueToCompare: unknown, message?: string): ValidatorFn =>
    (value: unknown) => {
      if (typeof valueToCompare === typeof value)
        return valueToCompare !== value ? SameValueError(message) : null;
      return valueToCompare !== value ? SameValueError(message) : null;
    };

  export const StaticFieldValidation = (
    value: unknown,
    ...validators: ValidatorFn[]
  ) => {
    const errors: any[] = [];
    validators.forEach((validator) => {
      const error = validator(value);
      errors.push(error);
    });
    return errors.filter((val) => !!val).length > 0;
  };

  export const EmailValidation = (value: string): ValidatorErrors | null => {
    return EMAIL_REGEXP.test(value) ? null : EmailError;
  };
  export const PasswordValidation = (value: string): ValidatorErrors | null => {
    return PASSWORD_REGEXP.test(value) ? null : PasswordError;
  };
}
