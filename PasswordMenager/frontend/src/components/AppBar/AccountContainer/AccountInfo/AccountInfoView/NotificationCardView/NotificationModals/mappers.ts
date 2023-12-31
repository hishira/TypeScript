import {
  ActivateNotification,
  DeleteNotification,
  SuspendNotifcation,
} from "../utils";
import { ActiveModal, DeleteModal, SuspendModal } from "./ModalsTexts";

export const ComponentMapper = {
  activate: ActiveModal,
  suspend: SuspendModal,
  delete: DeleteModal,
  "": undefined,
};
export const ActionHandlerMapper = {
  activate: ActivateNotification,
  suspend: SuspendNotifcation,
  delete: DeleteNotification,
  "": null,
};
