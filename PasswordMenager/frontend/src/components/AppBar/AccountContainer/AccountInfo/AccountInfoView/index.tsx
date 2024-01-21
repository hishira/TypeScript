import { Dispatch, SetStateAction } from "react";
import ImportRequestCardView from "./ImportRequestCardView";
import { LastDeletedElementsCardView } from "./LastDeletedElementsCardView";
import { NotificationCardView } from "./NotificationCardView";

export type ContentType = "Notification" | "ImportRequest" | "Last";

export const GetCurrentView = (
  mainContentView: ContentType,
  imports: any,
  refetch: Dispatch<SetStateAction<boolean>>
): JSX.Element => {
  return mainContentView === "Notification" ? (
    <NotificationCardView />
  ) : mainContentView === "ImportRequest" ? (
    <ImportRequestCardView imports={imports} refetch={refetch} />
  ) : (
    <LastDeletedElementsCardView />
  );
};
