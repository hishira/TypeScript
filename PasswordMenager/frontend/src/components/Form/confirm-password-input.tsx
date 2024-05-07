import FormElement from "../FormElement";

export const ConfirmPasswordElement = ({
  confirmpassword,
  handlethis,
}: {
  confirmpassword: boolean;
  handlethis: (value: string) => void;
}) => {
  return confirmpassword ? (
    <FormElement
      label="input.label.confirmPassword"
      inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handlethis(e.target.value)
      }
      inputplaceholder="*****"
      inputtype="password"
    />
  ) : null;
};
