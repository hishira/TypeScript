import { ActionFields } from "../../../hooks/actionFields.hook";

export type FieldsModalProps = {
  actionFields: ActionFields;
  refreshEntry: Function;
  deleteAcceptHandle: (...args: any[]) => any;
  DeleteEntryModal: () => JSX.Element;
  refreshgroupentities: Function;
};
export type EditEntryModalProps = {
  actionFields: ActionFields;
  refreshEntry: Function;
};
export type DeleteEntryAcceptModalProps = {
  actionFields: ActionFields;
  deleteAcceptHandle: (...args: any[]) => any;
  DeleteEntryModal: () => JSX.Element;
};
export type SmallModalButtonProps = {
  actionFields: ActionFields;
  refreshgroupentities: Function;
};
