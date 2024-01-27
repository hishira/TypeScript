import { useEffect, useState } from "react";
import { Translation } from "../Translation";
import { DownIcon } from "../icons/DownIcon";
import { UpIcon } from "../icons/UpIcon";
import { CardExpandComponent } from "./CardExpand";
import {
  Card,
  CardContent,
  CardHeader,
  CardIcons,
  EmptySpan,
} from "./component.styled";

export type FieldsCardViewProps = {
  selectedgroup: string;
  refreshall: boolean;
  refreshgroupentities: Function;
  passwords: IEntry[];
};
export type CardEntry = {
  open: boolean;
} & IEntry;

type FieldsIconProps = {
  entry: CardEntry;
  close: (entry: CardEntry) => void;
  open: (entry: CardEntry) => void;
};
const FieldsIcon = ({ entry, open, close }: FieldsIconProps) => {
  return entry.open ? (
    <UpIcon click={() => close(entry)} />
  ) : (
    <DownIcon click={() => open(entry)} />
  );
};

export const CardComponent = ({
  entry,
  deleteHandle,
  editHandle,
}: CardComponentProps) => {
  const [entryCard, setEntryCard] = useState<CardEntry>(entry);
  const [isEmptyTitle, setIsEmptyTitle] = useState<boolean>(false);
  useEffect(() => {
    if (entryCard.title === undefined || entryCard.title === "")
      setIsEmptyTitle(true);
  }, [entryCard]);
  return (
    <Card>
      <CardHeader>
        <CardContent>
          {isEmptyTitle ? (
            <EmptySpan>{Translation("entry.noTitle")}</EmptySpan>
          ) : (
            entryCard.title
          )}
        </CardContent>
        <CardIcons>
          <FieldsIcon
            entry={entryCard}
            close={(entry) => setEntryCard({ ...entryCard, open: false })}
            open={(entry) => setEntryCard({ ...entryCard, open: true })}
          />
        </CardIcons>
      </CardHeader>
      <CardExpandComponent
        entry={entryCard}
        deleteHandle={deleteHandle}
        editHandle={editHandle}
      />
    </Card>
  );
};
