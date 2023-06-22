import { useState } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { DownIcon } from "../icons/DownIcon";
import { UpIcon } from "../icons/UpIcon";
import {
  Card,
  CardContent,
  CardExpand,
  CardExpandContent,
  CardExpandContentRow,
  CardFieldName,
  CardFieldValue,
  CardHeader,
  CardIcons,
  Cards,
  CardsContainer,
} from "./component.styled";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

// TODO End component
type FieldsCardViewProps = {
  selectedgroup: string;
  refreshall: boolean;
};
type CardEntry = {
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

type CardComponentProps = {
  entry: CardEntry;
};
type CardExpendContentRowProps = {
  fieldName: string;
  value: string;
};
const CardExpendContentRow = ({
  fieldName,
  value,
}: CardExpendContentRowProps) => {
  return (
    <CardExpandContentRow>
      <CardFieldName>{fieldName}</CardFieldName>
      <CardFieldValue>{value}</CardFieldValue>
    </CardExpandContentRow>
  );
};
const CardExpandComponent = ({ entry }: CardComponentProps) => {
  return entry.open ? (
    <CardExpand>
      <CardIcons>
        <EditIcon /> <DeleteIcon />
      </CardIcons>
      <CardExpandContent>
        <CardExpendContentRow fieldName="Username" value={entry.username} />
        <CardExpendContentRow fieldName="Password" value={entry.password} />
        <CardExpendContentRow fieldName="Note" value={entry.note} />
      </CardExpandContent>
    </CardExpand>
  ) : null;
};
const CartComponent = ({ entry }: CardComponentProps) => {
  const [entryCard, setEntryCard] = useState<CardEntry>(entry);

  return (
    <Card>
      <CardHeader>
        <CardContent>
          <div>{entryCard.username}</div>
        </CardContent>
        <CardIcons>
          <FieldsIcon
            entry={entryCard}
            close={(entry) => setEntryCard({ ...entryCard, open: false })}
            open={(entry) => setEntryCard({ ...entryCard, open: true })}
          />
        </CardIcons>
      </CardHeader>
      <CardExpandComponent entry={entryCard} />
    </Card>
  );
};
const FieldsCardView = ({
  selectedgroup,
  refreshall,
}: FieldsCardViewProps): JSX.Element => {
  const entries: CardEntry[] = PasswordEntries(selectedgroup, refreshall).map(
    (entry) => ({
      ...entry,
      open: false,
    })
  );
  return (
    <CardsContainer>
      <Cards>
        {entries.map((entry) => (
          <CartComponent entry={entry} key={entry._id} />
        ))}
      </Cards>
    </CardsContainer>
  );
};

export default FieldsCardView;
