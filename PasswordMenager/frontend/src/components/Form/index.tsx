import React from "react";
import Button from "../../components/Button/index";
import FormElement from "../FormElement/";
import { Form, FormTitle, Link } from "./component.styled";
import { Translation } from "../Translation";

interface Props {
  buttonmessage: string;
  buttonHandle: (e: React.MouseEvent<HTMLElement>) => void;
  firstinputhandle: (value: string) => void;
  secondinputhandle: (value: string) => void;
  secondactionastirng: string;
  redirectfunction: () => void;
  maintitle: string;
  confirmpassword?: boolean;
  confirmpasshandle?: (value: string) => void;
  isEmail?: boolean;
  emailSetHandle?: (value: string) => void;
}
const FormComponent = ({
  buttonmessage,
  buttonHandle,
  firstinputhandle,
  secondinputhandle,
  secondactionastirng,
  redirectfunction,
  maintitle,
  confirmpassword,
  confirmpasshandle,
  isEmail,
  emailSetHandle,
}: Props): JSX.Element => {
  const handlethis = (value: string) => {
    if (confirmpasshandle) confirmpasshandle(value);
  };

  const isEmailAvailable = isEmail && emailSetHandle;
  return (
    <Form>
      <FormTitle>{Translation(maintitle)}</FormTitle>
      <FormElement
        label="input.label.login"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          firstinputhandle(e.target.value)
        }
        inputplaceholder="login.input.label.placeholder"
        inputtype="text"
      />
      {isEmailAvailable ? (
        <FormElement
          label="input.label.email"
          inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            emailSetHandle(e.target.value)
          }
          inputplaceholder="email.input.label.placeholder"
          inputtype="text"
        />
      ) : null}
      <FormElement
        label="input.label.password"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          secondinputhandle(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
      />
      {confirmpassword ? (
        <FormElement
          label="input.label.confirmPassword"
          inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlethis(e.target.value)
          }
          inputplaceholder="*****"
          inputtype="password"
        />
      ) : null}
      <p>
        {Translation("page.login.or")}
        <Link onClick={() => redirectfunction()}>
          {Translation(secondactionastirng)}
        </Link>
      </p>
      <Button
        onClick={buttonHandle}
        type="submit"
        margintop={10}
        fullwidth
        color="lightblue"
        size="large"
      >
        {Translation(buttonmessage)}
      </Button>
    </Form>
  );
};

export default FormComponent;
