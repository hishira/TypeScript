import { DOMAttributes, useEffect, useState } from "react";
import { PasswordFieldsHelper } from "../PasswordTable/PasswordField";
import { Translation } from "../Translation";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DownIcon } from "../icons/DownIcon";
import { EditIcon } from "../icons/EditIcon";
import { UpIcon } from "../icons/UpIcon";
import {
  Card,
  CardContent,
  CardExpand,
  CardExpandContent,
  CardExpandContentRow,
  CardFieldName,
  CardFieldValue,
  CardFieldValueURL,
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

type CardComponentProps = {
  entry: CardEntry;
  deleteHandle: Function;
  editHandle: Function;
};
type CardExpendContentRowProps = {
  fieldName: string;
  value: string;
  isPassword?: boolean;
  isUrl?: boolean;
};
type ValueFieldPropd = {
  isPassword: boolean | undefined;
  isUrl: boolean | undefined;
  value: string | IEntry | null;
};
const ValueField = ({ isPassword, value, isUrl }: ValueFieldPropd) => {
  const props: DOMAttributes<HTMLDivElement> = {};
  if (isPassword) {
    props["onClick"] = () => PasswordFieldsHelper.passwordClick(value);
  }
  if (isUrl) {
    props["onClick"] = () =>
      value && typeof value === "string" && window.open(value, "_blank");
  }
  return isPassword ? (
    <CardFieldValue {...props}>
      <span>******</span>
    </CardFieldValue>
  ) : isUrl ? (
    <CardFieldValueURL {...props}>{value}</CardFieldValueURL>
  ) : (
    <CardFieldValue {...props}>{value}</CardFieldValue>
  );
};
const CardExpendContentRow = ({
  fieldName,
  value,
  isPassword,
  isUrl,
}: CardExpendContentRowProps) => {
  return (
    <CardExpandContentRow>
      <CardFieldName>{Translation(fieldName)}</CardFieldName>
      <ValueField
        isPassword={isPassword}
        isUrl={isUrl}
        value={value}
      ></ValueField>
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
        <CardExpendContentRow
          fieldName="fieldscard.view.username"
          value={entry.username}
        />
        <CardExpendContentRow
          fieldName="fieldscard.view.password"
          value={entry.password}
          isPassword={true}
        />
        <CardExpendContentRow
          fieldName="fieldscard.view.note"
          value={entry.note}
        />
        {entry.url ? (
          <CardExpendContentRow
            fieldName="fieldscard.view.url"
            isUrl={true}
            value={entry.url}
          />
        ) : null}
        {entry.passwordExpiredDate ? (
          <CardExpendContentRow
            fieldName="fieldscard.view.expiredTo"
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
            <EmptySpan>{Translation('entry.noTitle')}</EmptySpan>
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
