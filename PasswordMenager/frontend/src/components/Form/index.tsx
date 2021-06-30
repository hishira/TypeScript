import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "../../components/Button/index";
import FormElement from "../FormElement/";

const clippath = keyframes`
  0% { clip-path: circle(0%); }
  100% { clip-path: circle(100%); }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.05rem solid whitesmoke;
  width: 50%;
  padding: 10px;
  @media (max-width: 900px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 85%;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 50px -5px;
  border-radius: 10px;
  animation: ${clippath} 0.9s linear forwards;
`;
const FormTitle = styled.p`
  font-size: 1.2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;
const Link = styled.span`
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
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
