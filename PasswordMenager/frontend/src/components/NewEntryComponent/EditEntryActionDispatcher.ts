import { Dispatch, SetStateAction } from "react";
import { PasswordCharactersTypes } from ".";
import { specialTypeGenerate, generatePart } from "./new-entry.utils";

type DispatchAction<T> = Dispatch<SetStateAction<T>>;
export class EditEntryActionDispatcher {
  private setnewentry: DispatchAction<CreateEntryDto>;
  private setpasswordcharacters: DispatchAction<PasswordCharactersTypes>;
  private passwordcharacters: PasswordCharactersTypes;
  private newentry: CreateEntryDto;
  private passwordLength: number;
  constructor(
    setNewEntry: DispatchAction<CreateEntryDto>,
    setpasswordcharacters: DispatchAction<PasswordCharactersTypes>,
    passwords: PasswordCharactersTypes,
    newentry: CreateEntryDto,
    passlen: number
  ) {
    this.setnewentry = setNewEntry;
    this.setpasswordcharacters = setpasswordcharacters;
    this.passwordcharacters = passwords;
    this.newentry = newentry;
    this.passwordLength = passlen;
  }

  clearInputData() {
    this.setnewentry({
      title: "",
      username: "",
      password: "",
      note: "",
      groupid: "",
    });
  }
  generateHandle() {
    let password: string = "";
    for (let i = 0; i < this.passwordLength; i++) {
      let type = specialTypeGenerate(this.passwordcharacters);
      password += generatePart(type);
    }
    this.setnewentry({ ...this.newentry, password: password });
  }

  letterscheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    this.setpasswordcharacters({
      ...this.passwordcharacters,
      letters: e.target.checked,
    });
  }

  numberscheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    this.setpasswordcharacters({
      ...this.passwordcharacters,
      numbers: e.target.checked,
    });
  }

  specialcharacters(e: React.ChangeEvent<HTMLInputElement>) {
    this.setpasswordcharacters({
      ...this.passwordcharacters,
      specialChar: e.target.checked,
    });
  }

  settitle(e: React.ChangeEvent<HTMLInputElement>) {
    this.setnewentry({ ...this.newentry, title: e.target.value });
  }

  setusername(e: React.ChangeEvent<HTMLInputElement>) {
    this.setnewentry({ ...this.newentry, username: e.target.value });
  }

  setpassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.setnewentry({ ...this.newentry, password: e.target.value });
  }

  setnote(e: React.ChangeEvent<HTMLInputElement>) {
    this.setnewentry({ ...this.newentry, note: e.target.value });
  }

  groupset(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value)
    this.setnewentry({ ...this.newentry, groupid: e.target.value });
  }
}
