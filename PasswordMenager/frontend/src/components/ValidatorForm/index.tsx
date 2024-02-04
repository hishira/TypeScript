import { useEffect, useState } from "react";
import FormElement, { FormProps } from "../FormElement";
import { ErrorContainer, Errors } from "../shared/styled-components";
import { ValidatorElement } from "./component.styled";

type ValidatorFormProps = FormProps & {
  validators: ValidatorFn[];
  isValid?: (isValid: boolean) => void;
};
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
    formProps.isValid && formProps.isValid(tmpErrors.length <= 0);
    setErrors(tmpErrors);
  };
  useEffect(() => {
    console.log(errors);
    setErrors((e) => e);
  }, [errors]);
  return (
    <ValidatorElement>
      <FormElement
        {...formProps}
        inputChange={(e) => inputValidation(e)}
        isError={errors.length > 0}
      />
      {errors && (
        <Errors>
          {errors.map((e) => (
            <ErrorContainer>{e.message}</ErrorContainer>
          ))}
        </Errors>
      )}
    </ValidatorElement>
  );
};
