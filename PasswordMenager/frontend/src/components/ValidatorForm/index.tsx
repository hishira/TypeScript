import { useEffect, useState } from "react";
import FormElement, { FormProps } from "../FormElement";
import { ErrorContainer } from "../shared/styled-components";

type ValidatorFormProps = FormProps & { validators: ValidatorFn[] };
export const ValidatorForm = (formProps: ValidatorFormProps) => {
  const [errors, setErrors] = useState<ErrorValue[]>([]);
  const inputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    formProps.inputChange(e);
    const tmpErrors: ErrorValue[] = [];
    formProps.validators.forEach((validator) => {
      const possibleErrors = validator(e.target.value);
      if (possibleErrors) {
        Object.keys(possibleErrors).forEach((errorKey) =>
          tmpErrors.push(possibleErrors[errorKey])
        );
      }
    });
    setErrors(tmpErrors);
    console.log(errors);
  };
  useEffect(() => {
    setErrors((e) => e);
  }, [errors]);
  return (
    <>
      <FormElement {...formProps} inputChange={(e) => inputValidation(e)} />
      {errors.forEach((e) => (
        <ErrorContainer>{e.message}</ErrorContainer>
      ))}
    </>
  );
};
