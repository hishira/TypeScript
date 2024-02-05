const RequiredErrors: ValidatorErrors = {
  required: {
    message: "Field is required",
  },
};
const MinLengthErrors: (minLength: number) => ValidatorErrors = (
  minLength: number
) => ({
  minLength: {
    message: `Minimum length is ${minLength}`,
  },
});
const SameValueError: (message?: string) => ValidatorErrors = (
  message?: string
) => ({
  saveValue: {
    message: message ?? "Values should be the same",
  },
});
export namespace Validators {
  export const Required: ValidatorFn = (value: unknown): ValidatorErrors => {
    return value === undefined ||
      value === null ||
      value === "" ||
      value === void 0
      ? RequiredErrors
      : null;
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
}
