import { PasswordCharactersTypes } from ".";

export const SMALLETTERS: string = "abcdefghijklmnouprstuwzyw";
export const BIGLETTERS: string = "ABCDEFGHIJKLMNOUPRSTUWZXY";
export const NUMBERS: string = "0987654321";
export const SPECIAL: string = "*()&^%$#@!~/{}+-";

type PasswordGenerateInformation = {
  nothingSelected: boolean;
  onlyLetters: boolean;
  lettersAndNumbers: boolean;
  allSelected: boolean;
  onlyNumbers: boolean;
  specialCharacters: boolean;
  specialAndNumbers: boolean;
};
export const checkBoxHandler = (
  e: React.ChangeEvent<HTMLInputElement>
): void => {
  let element: HTMLCollectionOf<HTMLInputElement> =
    document.getElementsByTagName("input");

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
export const generatePart = (typenumber: number): string => {
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

const getGeneratePassowrdAdditionalInfo = (
  passwordcharacters: PasswordCharactersTypes
): PasswordGenerateInformation => {
  const nothingSelected =
    !passwordcharacters.letters &&
    !passwordcharacters.numbers &&
    !passwordcharacters.specialChar;
  const onlyLetters =
    passwordcharacters.letters &&
    !passwordcharacters.numbers &&
    !passwordcharacters.specialChar;
  const lettersAndNumbers =
    passwordcharacters.letters &&
    passwordcharacters.numbers &&
    !passwordcharacters.specialChar;
  const allSelected =
    passwordcharacters.letters &&
    passwordcharacters.numbers &&
    passwordcharacters.specialChar;
  const onlyNumbers =
    !passwordcharacters.letters &&
    passwordcharacters.numbers &&
    !passwordcharacters.specialChar;
  const specialCharacters =
    !passwordcharacters.letters &&
    !passwordcharacters.numbers &&
    passwordcharacters.specialChar;
  const specialAndNumbers =
    !passwordcharacters.letters &&
    passwordcharacters.numbers &&
    passwordcharacters.specialChar;
  return {
    nothingSelected,
    onlyLetters,
    lettersAndNumbers,
    allSelected,
    onlyNumbers,
    specialCharacters,
    specialAndNumbers,
  };
};
export const specialTypeGenerate = (
  passwordcharacters: PasswordCharactersTypes
): number => {
  const passwordInfo = getGeneratePassowrdAdditionalInfo(passwordcharacters);
  if (passwordInfo.nothingSelected) return Math.floor(Math.random() * 4);
  if (passwordInfo.onlyLetters) return Math.floor(Math.random() * 2);
  if (passwordInfo.lettersAndNumbers) return Math.floor(Math.random() * 3);
  if (passwordInfo.allSelected) return Math.floor(Math.random() * 4);
  if (passwordInfo.onlyNumbers) return 2;
  if (passwordInfo.specialCharacters) return 3;
  if (passwordInfo.specialAndNumbers) return Math.floor(Math.random() * 2 + 2);
  let arr: Array<number> = [0, 3];
  return arr[Math.floor(Math.random() * arr.length)];
};
