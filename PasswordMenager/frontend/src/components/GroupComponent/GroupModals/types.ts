import { Dispatch, SetStateAction } from "react";
import { ActionGroup } from "../../../hooks/actionGroups.hook";

export type GroupModalProps = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};
export type CreateModalType = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};
export type DeleteModalType = {
  actionGroup: ActionGroup;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};
export type EditModalType = {
  actionGroup: ActionGroup;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};
