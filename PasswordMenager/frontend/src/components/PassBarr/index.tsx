import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal/";
import FormElement from "../FormElement/";
import NewEntryComponent from "../NewEntryComponent/index";
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
