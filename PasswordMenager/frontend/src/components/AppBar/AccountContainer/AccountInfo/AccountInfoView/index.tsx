import { ImportRequestCardView } from "./ImportRequestCardView";
import { LastDeletedElementsCardView } from "./LastDeletedElementsCardView";
import { NotificationCardView } from "./NotificationCardView";

export type ContentType = "Notification" | "ImportRequest" | "Last";

export const GetCurrentView = (
  mainContentView: ContentType,
  imports: any,
  notification: any
): JSX.Element => {
  return mainContentView === "Notification" ? (
    <NotificationCardView notification={notification} />
  ) : mainContentView === "ImportRequest" ? (
    <ImportRequestCardView imports={imports} />
  ) : (
    <LastDeletedElementsCardView />
  );
};
