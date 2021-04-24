import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import FormElement from "../FormElement/";
import { GetGroupsByUser } from "../../utils/group.utils";
import { CreateNewEntryUser } from "../../utils/entry.utils";
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
const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
`;
const PasswordCheckbox = styled.input``;
const Checkboxwithlabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const SelectLabel = styled.div`
  padding: 0.6rem 0.6rem 0.6rem 0;
  font-size: 1.05rem;
  text-align: start;
`;
const SelectContainer = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1.05rem;
`;
const OptionContainer = styled.option`
  padding: 1.4rem;
  font-size: 1.05rem;
  &:hover {
    background-color: lightsalmon;
  }
`;
type PasswordCharactersTypes = {
  letters: boolean;
  numbers: boolean;
  specialChar: boolean;
};
const NewEntryComponent = (): JSX.Element => {
  const oncheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let element: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName(
      "input"
    );
    if (e.target.checked) {
      for (let i of element) {
        if (i.type === "password") {
          i.type = "text";
        }
      }
    } else {
      for (let i of element) {
        if (i.placeholder === "***") i.type = "password";
      }
    }
  };
  const [passlen, setpasslen] = useState<number>(6);
  const [
    passwordcharacters,
    setpasswordcharacters,
  ] = useState<PasswordCharactersTypes>({
    letters: false,
    numbers: false,
    specialChar: false,
  });
  const [newentry, setnewentry] = useState<CreateEntryDto>({
    title: "",
    username: "",
    password: "",
    note: "",
    groupid: "",
  });
  const [groups, setgroups] = useState<Array<IGroup>>([]);
  const SMALLETTERS: string = "abcdefghijklmnouprstuwzyw";
  const BIGLETTERS: string = "ABCDEFGHIJKLMNOUPRSTUWZXY";
  const NUMBERS: string = "0987654321";
  const SPECIAL: string = "*()&^%$#@!~/{}+-";

  const fetchGroup = async (): Promise<void> => {
    const response: GroupResponse = await GetGroupsByUser();
    if (response.status) {
      setgroups(response.response);
    } else {
      setgroups([]);
    }
  };
  useEffect(() => {
    fetchGroup();
  }, []);
  const generatePart = (typenumber: number): string => {
    switch (typenumber) {
      case 0:
        return SMALLETTERS[Math.floor(Math.random() * SMALLETTERS.length)];
      case 1:
        return BIGLETTERS[Math.floor(Math.random() * BIGLETTERS.length)];
      case 2:
        return NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
      case 3:
        return SPECIAL[Math.floor(Math.random() * SPECIAL.length)];
    }
    return "";
  };

  const specialTypeGenerate = (): number => {
    if (
      !passwordcharacters.letters &&
      !passwordcharacters.numbers &&
      !passwordcharacters.specialChar
    )
      return Math.floor(Math.random() * 4);
    else if (
      passwordcharacters.letters &&
      !passwordcharacters.numbers &&
      !passwordcharacters.specialChar
    )
      return Math.floor(Math.random() * 2);
    else if (
      passwordcharacters.letters &&
      passwordcharacters.numbers &&
      !passwordcharacters.specialChar
    )
      return Math.floor(Math.random() * 3);
    else if (
      passwordcharacters.letters &&
      passwordcharacters.numbers &&
      passwordcharacters.specialChar
    )
      return Math.floor(Math.random() * 4);
    else if (
      !passwordcharacters.letters &&
      passwordcharacters.numbers &&
      !passwordcharacters.specialChar
    )
      return 2;
    else if (
      !passwordcharacters.letters &&
      !passwordcharacters.numbers &&
      passwordcharacters.specialChar
    )
      return 3;
    else if (
      !passwordcharacters.letters &&
      passwordcharacters.numbers &&
      passwordcharacters.specialChar
    )
      return Math.floor(Math.random() * 2 + 2);
    let arr: Array<number> = [0, 3];
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const generateHandle = (): void => {
    let password: string = "";
    for (let i = 0; i < passlen; i++) {
      let type = specialTypeGenerate();
      password += generatePart(type);
    }
    setnewentry({ ...newentry, password: password });
  };

  const letterscheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setpasswordcharacters({ ...passwordcharacters, letters: e.target.checked });
  };

  const numberscheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setpasswordcharacters({ ...passwordcharacters, numbers: e.target.checked });
  };

  const specialcharacters = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setpasswordcharacters({
      ...passwordcharacters,
      specialChar: e.target.checked,
    });
  };

  const settitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setnewentry({ ...newentry, title: e.target.value });
  };

  const setusername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setnewentry({ ...newentry, username: e.target.value });
  };

  const setpassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setnewentry({ ...newentry, password: e.target.value });
  };

  const setnote = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setnewentry({ ...newentry, note: e.target.value });
  };

  const groupset = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setnewentry({ ...newentry, groupid: e.target.value });
  };

  const clearInputData = (): void => {
    setnewentry({
      title: "",
      username: "",
      password: "",
      note: "",
      groupid: "",
    });
  };
  const addnewentry = async (): Promise<void> => {
    const responsenewentry: CreateEntryResponse = await CreateNewEntryUser(
      newentry
    );
    if (responsenewentry.status) {
      console.log("OK");
      clearInputData();
      return;
    } else {
      console.log("Something wrong");
    }
  };
  return (
    <EntryModalComponent>
      <FormElement
        label={"Title"}
        inputplaceholder="title name"
        inputChange={settitle}
        inputtype="txt"
      />
      <FormElement
        label={"Username"}
        inputplaceholder="username"
        inputChange={setusername}
        inputtype="txt"
      />
      <SelectLabel>Select group</SelectLabel>
      <SelectContainer onChange={groupset}>
        {groups.map((group) => (
          <OptionContainer value={group._id}>{group.name}</OptionContainer>
        ))}
      </SelectContainer>
      <SectionContainer>
        <FormElement
          label={"Password"}
          inputplaceholder="***"
          inputChange={setpassword}
          inputtype="password"
          value={newentry.password}
        />
        <CheckBox type="checkbox" onChange={oncheckbox} />
      </SectionContainer>
      <SectionContainer>
        <Checkboxes>
          <Checkboxwithlabel>
            <PasswordCheckbox type="checkbox" onChange={letterscheckbox} />
            <div>Letters</div>
          </Checkboxwithlabel>
          <Checkboxwithlabel>
            <PasswordCheckbox type="checkbox" onChange={numberscheckbox} />
            <div>Numbers</div>
          </Checkboxwithlabel>
          <Checkboxwithlabel>
            <PasswordCheckbox type="checkbox" onChange={specialcharacters} />
            <div>Special characters</div>
          </Checkboxwithlabel>
        </Checkboxes>
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
        inputChange={setnote}
        inputtype="text"
      />
      <Button size="small" color="lightblue" onClick={addnewentry}>
        Add
      </Button>
    </EntryModalComponent>
  );
};
export default NewEntryComponent;
