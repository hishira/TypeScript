import { Translation } from "../../../../../../../Translation";
import { TitleContainer } from "../../../../../../../shared/styled-components";
import {
  NotificationContentModal,
  NotificationTextModal,
} from "./component.styled";

export const ActiveModal = (
  <NotificationTextModal>
    <TitleContainer>{Translation('notification.modalTitle.activate')}</TitleContainer>
    <NotificationContentModal>
      {Translation("notification.active.text")}
    </NotificationContentModal>
  </NotificationTextModal>
);
export const SuspendModal = (
  <NotificationTextModal>
    <TitleContainer>{Translation('notification.modalTitle.suspend')}</TitleContainer>
    <NotificationContentModal>
      {Translation("notification.suspend.text")}
    </NotificationContentModal>
  </NotificationTextModal>
);
export const DeleteModal = (
  <NotificationTextModal>
    <TitleContainer>{Translation('notification.modalTitle.delete')}</TitleContainer>
    <NotificationContentModal>
      {Translation("notification.delete.text")}
    </NotificationContentModal>
  </NotificationTextModal>
);
