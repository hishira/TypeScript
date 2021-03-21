import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal/";
import FormElement from "../FormElement/";

const Container = styled.div`
  display: flex;
  padding: 5px;
  & > *:not(:first-child) {
    margin-left: 15px;
  }
`;

const EntryModalComponent = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
`;
const SectionContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
const CheckBox = styled.input`
  transform: translate(0%, 175%);
`;

type NewEntryProps = {
  usernamefunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordfunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  notefunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: string;
  setpassword: any;
};

const NewEntryComponent = ({
  usernamefunc,
  passwordfunc,
  notefunc,
  password,
  setpassword,
}: NewEntryProps) => {
  const oncheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let element: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName(
      "input"
    );
    if (e.target.checked) {
      for (let i of element) {
        if (i.type === "password") {
          i.type = "text";
        }
        console.log(i.placeholder);
      }
    } else {
      console.log(element);
      for (let i of element) {
        if (i.placeholder === "***") i.type = "password";
      }
    }
  };

  const generateHandle = (): void => {
    let alp: string = "abcdefghijklmnouprstuwzyw";
    let alpb: string = "ABCDEFGHIJKLMNOUPRSTUWZXY";
    let num: string = "0987654321";
    let password: string = "";
    for (let i = 0; i < 8; i++) {
      let type = Math.floor(Math.random() * 3);
      switch (type) {
        case 0:
          password += alp[Math.floor(Math.random() * alp.length)];
          break;
        case 1:
          password += alpb[Math.floor(Math.random() * alpb.length)];
          break;
        case 2:
          password += num[Math.floor(Math.random() * num.length)];
      }
    }
    console.log(password);
    setpassword(password);
  };

  return (
    <EntryModalComponent>
      <FormElement
        label={"Username"}
        inputplaceholder="username"
        inputChange={usernamefunc}
        inputtype="txt"
      />
      <SectionContainer>
        <FormElement
          label={"Password"}
          inputplaceholder="***"
          inputChange={passwordfunc}
          inputtype="password"
          value={password}
        />
        <CheckBox type="checkbox" onChange={oncheckbox} />
      </SectionContainer>
      <SectionContainer>
        <Button size="small" color="lightblue" onClick={generateHandle}>
          Generate
        </Button>
        <Button size="small" color="lightblue">
          Save
        </Button>
      </SectionContainer>
      <FormElement
        label={"Note"}
        inputplaceholder="note..."
        inputChange={notefunc}
        inputtype="txt"
      />
    </EntryModalComponent>
  );
};

const PassBar = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [note, setnote] = useState<string>("");
  const closehandle = (): void => setmodalopen(false);
  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={
          <NewEntryComponent
            usernamefunc={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setusername(e.target.value)
            }
            passwordfunc={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setpassword(e.target.value)
            }
            notefunc={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setnote(e.target.value)
            }
            password={password}
            setpassword={setpassword}
          />
        }
      />
      <Button color="lightgray" onClick={() => setmodalopen(true)}>
        New entry
      </Button>
      <Button color="lightgray">Generate</Button>
    </Container>
  );
};

export default PassBar;
