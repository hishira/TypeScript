import { useEffect, useState } from "react";
import FormElement, { FormProps } from "../FormElement";
import { ErrorContainer, Errors } from "../shared/styled-components";
import { ValidatorElement, ValidatorSpanElement } from "./component.styled";

type ValidatorFormProps = FormProps & {
  validators: ValidatorFn[];
  isValid?: (isValid: boolean) => void;
};
export const ValidatorForm = (formProps: ValidatorFormProps) => {
  const [errors, setErrors] = useState<ErrorValue[]>([]);
  console.log(formProps);
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
    setErrors((e) => e);
    formProps.isValid && formProps.isValid(errors.length <= 0);
  }, [errors]);
  return (
    <>
      <FormElement
        {...formProps}
        inputChange={(e) => inputValidation(e)}
        isError={errors.length > 0}
        errors={
          errors && (
            <Errors width={formProps?.width ?? undefined}>
              {errors.map((e) => (
                <ErrorContainer>{e.message}</ErrorContainer>
              ))}
            </Errors>
          )
        }
      />
    </>
  );
};
