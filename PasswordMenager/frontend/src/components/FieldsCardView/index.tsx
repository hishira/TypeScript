import { DOMAttributes, useState } from "react";
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
import { PasswordFieldsHelper } from "../PasswordTable/PasswordField";

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
  isPassword?: boolean;
};
type ValueFieldPropd = {
  isPassword: boolean | undefined;
  value: string | IEntry | null;
};
const ValueField = ({ isPassword, value }: ValueFieldPropd) => {
  const props: DOMAttributes<HTMLDivElement> = {};
  if (isPassword) {
    props["onClick"] = () => PasswordFieldsHelper.passwordClick(value);
  }
  return isPassword ? (
    <CardFieldValue {...props}>
      <span>******</span>
    </CardFieldValue>
  ) : (
    <CardFieldValue {...props}>{value}</CardFieldValue>
  );
};
const CardExpendContentRow = ({
  fieldName,
  value,
  isPassword,
}: CardExpendContentRowProps) => {
  return (
    <CardExpandContentRow>
      <CardFieldName>{fieldName}</CardFieldName>
      <ValueField isPassword={isPassword} value={value}></ValueField>
    </CardExpandContentRow>
  );
};
const CardExpandComponent = ({ entry }: CardComponentProps) => {
  return entry.open ? (
    <CardExpand>
      <CardExpandContent>
        <CardExpendContentRow fieldName="Username" value={entry.username} />
        <CardExpendContentRow
          fieldName="Password"
          value={entry.password}
          isPassword={true}
        />
        <CardExpendContentRow fieldName="Note" value={entry.note} />
      </CardExpandContent>
      <CardIcons>
        <EditIcon /> <DeleteIcon />
      </CardIcons>
    </CardExpand>
  ) : null;
};
const CartComponent = ({ entry }: CardComponentProps) => {
  const [entryCard, setEntryCard] = useState<CardEntry>(entry);

  return (
    <Card>
      <CardHeader>
        <CardContent>
          <div>{entryCard.title}</div>
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

const EntriesMappes = (entries: IEntry[]): CardEntry[] =>
  entries.map((entry) => ({
    ...entry,
    open: false,
  }));

const EntriesComponentMapper = (entries: CardEntry[]) =>
  entries.map((entry) => <CartComponent entry={entry} key={entry._id} />);

const FieldsCardView = ({
  selectedgroup,
  refreshall,
}: FieldsCardViewProps): JSX.Element => {
  const entries: CardEntry[] = EntriesMappes(
    PasswordEntries(selectedgroup, refreshall)
  );
  const Entries: JSX.Element[] = EntriesComponentMapper(entries);
  return (
    <CardsContainer>
      <Cards>{Entries}</Cards>
    </CardsContainer>
  );
};

export default FieldsCardView;
