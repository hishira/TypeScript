import { Dispatch, SetStateAction } from "react";
import ImportRequestCardView from "./ImportRequestCardView";
import { LastDeletedElementsCardView } from "./LastDeletedElementsCardView";
import { NotificationCardView } from "./NotificationCardView";

export type ContentType = "Notification" | "ImportRequest" | "Last";

const ContentMapper: {
  [key in ContentType]: (
    imports: any,
    refetch: Dispatch<SetStateAction<boolean>>
  ) => JSX.Element;
} = {
  Notification: (_, __) => <NotificationCardView />,
  ImportRequest: (imports, refetch) => (
    <ImportRequestCardView imports={imports} refetch={refetch} />
  ),
  Last: (_, __) => <LastDeletedElementsCardView />,
};
export const GetCurrentView = (
  mainContentView: ContentType,
  imports: any,
  refetch: Dispatch<SetStateAction<boolean>>
): JSX.Element => {
  return ContentMapper[mainContentView](imports, refetch);
};
