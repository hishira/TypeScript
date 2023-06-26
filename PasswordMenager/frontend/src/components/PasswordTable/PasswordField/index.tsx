import { useRef } from "react";
import { TooLongValue } from "../../../hooks/tooLongValue.hook";
import {
  MinButton,
  TableButton,
  TableComponent,
  TableRow,
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
        .catch((e) => console.log("not ok"));
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
        {" "}
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
        {" "}
        <span>{entry.note}</span>
      </TableComponent>
      <TableComponent>
        <TableButton onClick={() => deletehandle(entry._id)} color="lightblue">
          Delete
        </TableButton>
        <TableButton
          color="lightgrey"
          onClick={() => onedithandle(entry._id)}
          style={{ marginLeft: ".4rem" }}
        >
          Edit
        </TableButton>
        <MinButton onClick={() => moreClickHandle(entry)}>More</MinButton>
      </TableComponent>
    </TableRow>
  );
};
