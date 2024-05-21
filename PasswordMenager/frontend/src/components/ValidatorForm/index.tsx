import { useEffect, useState } from "react";
import FormElement, { FormProps } from "../FormElement";
import { ErrorContainer, Errors } from "../shared/styled-components";

type ValidatorFormProps = FormProps & {
  validators: ValidatorFn[];
  isValid?: (isValid: boolean) => void;
  formErrors?: ErrorValue[];
};
export const ValidatorForm = (formProps: ValidatorFormProps) => {
  const [errors, setErrors] = useState<ErrorValue[]>(
    formProps.formErrors ?? []
  );
  const inputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    formProps.inputChange(e);
    let tmpErrors: ErrorValue[] = [];
    formProps.validators.forEach((validator) => {
      const possibleErrors = validator(e.target.value);
      if (possibleErrors) {
        Object.keys(possibleErrors).forEach((errorKey) =>
          tmpErrors.push(possibleErrors[errorKey])
        );
        tmpErrors = prepareUniqeErrorArray(...tmpErrors);
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
      setErrors((e) =>
        prepareUniqeErrorArray(...e, ...(formProps.formErrors as ErrorValue[]))
      );
    }
  }, [formProps.formErrors]);

  const prepareUniqeErrorArray = (...errors: ErrorValue[]): ErrorValue[] => {
    const errorMessages: string[] = errors.map((error) => error.message);

    return Array.from(new Set([...errorMessages])).map((errorMessage) => ({
      message: errorMessage,
    }));
  };
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
