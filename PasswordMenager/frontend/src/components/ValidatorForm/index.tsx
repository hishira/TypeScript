import { useEffect, useState } from "react";
import FormElement, { FormProps } from "../FormElement";
import { ErrorContainer, Errors } from "../shared/styled-components";
import { ValidatorElement, ValidatorSpanElement } from "./component.styled";

type ValidatorFormProps = FormProps & {
  validators: ValidatorFn[];
  isValid?: (isValid: boolean) => void;
  formErrors?: ErrorValue[];
};
export const ValidatorForm = (formProps: ValidatorFormProps) => {
  const [errors, setErrors] = useState<ErrorValue[]>(
    formProps.formErrors ?? []
  );
  console.log(formProps);
  const inputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    formProps.inputChange(e);
    let tmpErrors: ErrorValue[] = [];
    formProps.validators.forEach((validator) => {
      const possibleErrors = validator(e.target.value);
      if (possibleErrors) {
        Object.keys(possibleErrors).forEach((errorKey) =>
          tmpErrors.push(possibleErrors[errorKey])
        );
        tmpErrors = Array.from(new Set(tmpErrors));
      }
    });
    formProps.isValid && formProps.isValid(tmpErrors.length <= 0);
    setErrors(tmpErrors);
  };
  useEffect(() => {
    setErrors((e) => e);
    formProps.isValid && formProps.isValid(errors.length <= 0);
  }, [errors]);
  useEffect(() => {
    if (
      formProps?.formErrors !== undefined &&
      Array.isArray(formProps?.formErrors) &&
      formProps?.formErrors.length > 0
    ) {
      setErrors((e) => [...e, ...(formProps.formErrors as ErrorValue[])]);
    }
  }, [formProps.formErrors]);
  return (
    <FormElement
      {...formProps}
      inputChange={(e) => inputValidation(e)}
      isError={errors.length > 0}
      errors={
        errors && (
          <Errors width={formProps?.width ?? undefined}>
            {errors.map((e) => (
              <ErrorContainer key={e.message}>{e.message}</ErrorContainer>
            ))}
          </Errors>
        )
      }
    />
  );
};
