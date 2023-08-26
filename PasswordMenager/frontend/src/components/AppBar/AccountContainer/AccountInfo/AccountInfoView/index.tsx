import { Last } from "../component.styled";
import { ImportRequestCardView } from "./ImportRequestCardView";
import { NotificationCardView } from "./NotificationCardView";

export type ContentType = "Notification" | "ImportRequest" | "Last";

const LastElement = () => <Last>Last 10 deleted entries</Last>;
export const GetCurrentView = (
  mainContentView: ContentType,
  imports: any,
  notification: any
): JSX.Element => {
  return mainContentView === "Notification" ? (
    <NotificationCardView notification={notification} />
  ) : mainContentView === "ImportRequest" ? (
    <ImportRequestCardView imports={imports}></ImportRequestCardView>
  ) : (
    <LastElement></LastElement>
  );
};
