import React from "react";
import Button from "../../components/Button/index";
import FormElement from "../FormElement/";
import { Form, FormTitle, Link } from "./component.styled";


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
}: Props): JSX.Element => {
  const handlethis = (value: string) => {
    if (confirmpasshandle) confirmpasshandle(value);
  };
  return (
    <Form>
      <FormTitle>{maintitle}</FormTitle>
      <FormElement
        label="Login"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          firstinputhandle(e.target.value)
        }
        inputplaceholder="Login"
        inputtype="text"
      />
      <FormElement
        label="Password"
        inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          secondinputhandle(e.target.value)
        }
        inputplaceholder="*****"
        inputtype="password"
      />
      {confirmpassword ? (
        <FormElement
          label="Confirm password"
          inputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlethis(e.target.value)
          }
          inputplaceholder="*****"
          inputtype="password"
        />
      ) : null}
      <p>
        Or <Link onClick={() => redirectfunction()}>{secondactionastirng}</Link>
      </p>
      <Button
        onClick={buttonHandle}
        type="submit"
        margintop={10}
        fullwidth
        color="lightblue"
        size="large"
      >
        {buttonmessage}
      </Button>
    </Form>
  );
};

export default FormComponent;
