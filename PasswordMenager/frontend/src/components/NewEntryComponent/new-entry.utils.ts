import { PasswordCharactersTypes } from ".";

export const SMALLETTERS: string = "abcdefghijklmnouprstuwzyw";
export const BIGLETTERS: string = "ABCDEFGHIJKLMNOUPRSTUWZXY";
export const NUMBERS: string = "0987654321";
export const SPECIAL: string = "*()&^%$#@!~/{}+-";

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

export const specialTypeGenerate = (
  passwordcharacters: PasswordCharactersTypes
): number => {
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
