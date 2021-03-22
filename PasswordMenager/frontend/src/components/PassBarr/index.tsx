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
const PassLen = styled.div`
  font-size: ".9rem";
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
  titlefunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: string;
  setpassword: any;
};

const NewEntryComponent = ({
  usernamefunc,
  passwordfunc,
  notefunc,
  titlefunc,
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
      for (let i of element) {
        if (i.placeholder === "***") i.type = "password";
      }
    }
  };
  const [passlen, setpasslen] = useState<number>(6);
  const SMALLETTERS: string = "abcdefghijklmnouprstuwzyw";
  const BIGLETTERS: string = "ABCDEFGHIJKLMNOUPRSTUWZXY";
  const NUMBERS: string = "0987654321";

  const generatePart = (typenumber: number): string => {
    switch (typenumber) {
      case 0:
        return SMALLETTERS[Math.floor(Math.random() * SMALLETTERS.length)];
      case 1:
        return BIGLETTERS[Math.floor(Math.random() * BIGLETTERS.length)];
      case 2:
        return NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    }
    return "";
  };

  const generateHandle = (): void => {
    let password: string = "";
    for (let i = 0; i < passlen; i++) {
      let type = Math.floor(Math.random() * 3);
      password += generatePart(type);
    }
    console.log(password);
    setpassword(password);
  };

  return (
    <EntryModalComponent>
      <FormElement
        label={"Title"}
        inputplaceholder="title name"
        inputChange={usernamefunc}
        inputtype="txt"
      />
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
      <SectionContainer style={{ position: "relative" }}>
        <Button size="small" color="lightblue" onClick={generateHandle}>
          Generate
        </Button>
        <Button size="small" color="lightblue">
          Save
        </Button>
        <input
          type="range"
          min="6"
          max="50"
          value={passlen}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setpasslen(parseInt(e.target.value))
          }
        />
        <PassLen id="passlen">{passlen}</PassLen>
      </SectionContainer>
      <FormElement
        label={"Note"}
        inputplaceholder="note..."
        inputChange={notefunc}
        inputtype="text"
      />
    </EntryModalComponent>
  );
};

const PassBar = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [note, setnote] = useState<string>("");
  const [title, settitle] = useState<string>("");
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
            titlefunc={(e: React.ChangeEvent<HTMLInputElement>): void =>
              settitle(e.target.value)
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
