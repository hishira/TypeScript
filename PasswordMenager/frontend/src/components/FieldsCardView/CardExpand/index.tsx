import { Translation } from "../../Translation";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
import { ValueField } from "../ValueField";
import {
  CardExpand,
  CardExpandContent,
  CardExpandContentRow,
  CardFieldName,
  CardIcons,
} from "../component.styled";

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
export const CardExpandComponent = ({
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
