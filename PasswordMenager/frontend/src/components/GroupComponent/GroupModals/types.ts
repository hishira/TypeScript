import { ActionGroup } from "../../../hooks/actionGroups.hook";

export type GroupModalProps = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  newGroupComponent: JSX.Element;
  deleteHandle: () => void;
  editHandle: (groupName: string) => void;
};
export type CreateModalType = {
  actionGroup: ActionGroup;
  newGroupCloseHandle: () => void;
  newGroupComponent: JSX.Element;
};
export type DeleteModalType = {
  actionGroup: ActionGroup;
  deleteHandle: () => void;
};
export type EditModalType = {
  actionGroup: ActionGroup;
  editHandle: (value: string) => void;
};
