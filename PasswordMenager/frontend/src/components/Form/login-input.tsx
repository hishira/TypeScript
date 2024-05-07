import FormElement from "../FormElement";

export type InputChangeHandler = {
  inputChangeHandler: (value: string) => void;
};
export const LoginInputElement = ({
  inputChangeHandler,
}: InputChangeHandler) => (
  <FormElement
    label="input.label.login"
    inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      inputChangeHandler(e.target.value)
    }
    inputplaceholder="login.input.label.placeholder"
    inputtype="text"
  />
);
