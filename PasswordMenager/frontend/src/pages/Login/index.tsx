import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid red;
`;
const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 10px;
  margin-top: 5rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.05rem solid slategray;
  width: 50%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 50px -5px;
  border-radius: 5px;
`;
const FormTitle = styled.p`
  font-size: 1.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;
const FormElement = styled.p`
    display: flex;
    flex-direction: column;
`
const InputLabel = styled.label`
    font-size: 1.2rem;
`
const LoginPage = (): JSX.Element => {
  return (
    <Container>
      <FormContainer>
        <Form>
          <FormTitle>Log in to account</FormTitle>
          <FormElement>
            <InputLabel>login</InputLabel>
            <input type="text" />
          </FormElement>
          <FormElement>
            <label>password</label>
            <input type="password" />
          </FormElement>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
