import { Dispatch, SetStateAction } from "react";
import { EditEntryActionDispatcher } from "./EditEntryActionDispatcher";

export type PasswordGenerateInformation = {
  nothingSelected: boolean;
  onlyLetters: boolean;
  lettersAndNumbers: boolean;
  allSelected: boolean;
  onlyNumbers: boolean;
  specialCharacters: boolean;
  specialAndNumbers: boolean;
};

export type PasswordCharactersTypes = {
  letters: boolean;
  numbers: boolean;
  specialChar: boolean;
};
export type NewEntryProps = {
  edit?: boolean;
  editentryid?: string;
  refreshentry: boolean;
  refresh?: Function;
  closeModalDispatcherHandle?: Dispatch<SetStateAction<boolean>>;
};

export type GroupSelectionProps = {
  edit: boolean | undefined;
  editEntry: EditEntryActionDispatcher;
  groups: IGroup[];
};

export type PasswordGeneratorOptionProps = {
  editEntry: EditEntryActionDispatcher;
  open: boolean;
  passwordLength: number;
  passwordLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
};

export type DispatchAction<T> = Dispatch<SetStateAction<T>>;
