import {
  MinButton,
  TableButton,
  TableComponent,
  TableRow,
} from "./component.styled";

const PasswordFieldsHelper = {
    gettext: (text: string | null): string => {
      return text ? text : "";
    },
    passwordClick: (entry: IEntry): void => {
      let elementpass: HTMLElement | null = document.getElementById(
        `${entry._id}${entry.groupid}`
      );
      console.log(elementpass);
      if (elementpass !== null) {
        navigator.clipboard
          .writeText(PasswordFieldsHelper.gettext(entry.password))
          .then(() => console.log("ok"))
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
  return (
    <TableRow key={entry._id}>
      <TableComponent>{entry.title}</TableComponent>
      <TableComponent>{entry.username}</TableComponent>
      <TableComponent
        id={`${entry._id}${entry.groupid}`}
        onClick={() => [PasswordFieldsHelper.passwordClick(entry)]}
        password
        placeholder="*****"
      >
        *****
      </TableComponent>
      <TableComponent>{entry.note}</TableComponent>
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
