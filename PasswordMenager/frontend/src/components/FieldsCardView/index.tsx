import { useEffect, useState } from "react";
import { PasswordEntries } from "../../hooks/password-entries.hook";
import { DownIcon } from "../icons/DownIcon";
import { UpIcon } from "../icons/UpIcon";
import {
  Card,
  CardContent,
  CardExpand,
  CardHeader,
  CardIcons,
  Cards,
  CardsContainer,
} from "./component.styled";

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
const CardExpandComponent = ({ entry }: CardComponentProps) => {
  return entry.open ? (
    <CardExpand>
      <div>username{entry.username}</div>
      <div>password{entry.password}</div>
      <div>note{entry.note}</div>
    </CardExpand>
  ) : null;
};
const CartComponent = ({ entry }: CardComponentProps) => {
  const [entryCard, setEntryCard] = useState<CardEntry>(entry);

  return (
    <Card>
      <CardHeader>
        <CardContent>{entryCard.username}</CardContent>
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
