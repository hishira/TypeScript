import { DOMAttributes, useState } from "react";
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
} from "./component.styled";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { PasswordFieldsHelper } from "../PasswordTable/PasswordField";
import { UpIcon } from "../icons/UpIcon";
import { DownIcon } from "../icons/DownIcon";

export type FieldsCardViewProps = {
  selectedgroup: string;
  refreshall: boolean;
  refreshgroupentities: Function;
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

type CardComponentProps = {
  entry: CardEntry;
  deleteHandle: Function;
  editHandle: Function;
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
const CardExpandComponent = ({
  entry,
  editHandle,
  deleteHandle,
}: CardComponentProps) => {
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
        {entry.url ? (
          <CardExpendContentRow fieldName="Url" value={entry.url} />
        ) : null}
        {entry.passwordExpiredDate ? (
          <CardExpendContentRow
            fieldName="Expired to"
            value={entry.passwordExpiredDate}
          />
        ) : null}
      </CardExpandContent>
      <CardIcons>
        <EditIcon click={() => editHandle(entry)} />{" "}
        <DeleteIcon click={() => deleteHandle(entry)} />
      </CardIcons>
    </CardExpand>
  ) : null;
};
export const CardComponent = ({
  entry,
  deleteHandle,
  editHandle,
}: CardComponentProps) => {
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
      <CardExpandComponent
        entry={entryCard}
        deleteHandle={deleteHandle}
        editHandle={editHandle}
      />
    </Card>
  );
};
