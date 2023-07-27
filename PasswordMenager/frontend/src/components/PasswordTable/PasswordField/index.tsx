import { useRef } from "react";
import { TooLongValue } from "../../../hooks/tooLongValue.hook";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
import {
  MinButton,
  PasswordTableIcons,
  TableComponent,
  TableRow
} from "./component.styled";

export const PasswordFieldsHelper = {
  gettext: (text: string | null): string => {
    return text ? text : "";
  },

  isEntry: (entry: IEntry | string | null): boolean => {
    return (
      entry !== null &&
      typeof entry === "object" &&
      "_id" in entry &&
      "password" in entry
    );
  },
  passwordClick: (entry: IEntry | string | null): void => {
    const text: string | null = PasswordFieldsHelper.isEntry(entry)
      ? (entry as IEntry).password
      : (entry as string);
    if (entry !== null) {
      navigator.clipboard
        .writeText(PasswordFieldsHelper.gettext(text))
        .catch((e) => console.error(e));
    }
  },
};
type PasswordFieldType = {
  entry: IEntry;
  deletehandle: Function;
  onedithandle: Function;
  moreClickHandle: Function;
};
export const PasswordField = ({
  entry,
  deletehandle,
  onedithandle,
  moreClickHandle,
}: PasswordFieldType) => {
  const TableRefComponent = useRef<HTMLTableRowElement>(null);
  TooLongValue(TableRefComponent);
  return (
    <TableRow ref={TableRefComponent} key={entry._id}>
      <TableComponent>
        <span>{entry.title}</span>
      </TableComponent>
      <TableComponent>
        <span>{entry.username} </span>
      </TableComponent>
      <TableComponent
        id={`${entry._id}${entry.groupid}`}
        onClick={() => [PasswordFieldsHelper.passwordClick(entry)]}
        password
        placeholder="*****"
      >
        *****
      </TableComponent>
      <TableComponent>
        <span>{entry.note}</span>
      </TableComponent>
      <TableComponent>
        <PasswordTableIcons>
          <DeleteIcon click={() => deletehandle(entry._id)} />
          <EditIcon click={() => onedithandle(entry._id)} />
        </PasswordTableIcons>
        <MinButton onClick={() => moreClickHandle(entry)}>More</MinButton>
      </TableComponent>
    </TableRow>
  );
};
