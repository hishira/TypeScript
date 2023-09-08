import { Translation } from "../Translation";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "./component.styled";
import { PasswordField } from "./PasswordField";

type PassTableProp = {
  entries: IEntry[];
  deletehandle: any;
  onedithandle: any;
  moreClickHandle: any;
};
export const PasswordTableComponent = ({
  entries,
  deletehandle,
  onedithandle,
  moreClickHandle,
}: PassTableProp): JSX.Element => {
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          <th>{Translation("entries.table.column.title")}</th>
          <th>{Translation("entries.table.column.username")}</th>
          <th>{Translation("entries.table.column.password")}</th>
          <th>{Translation("entries.table.column.note")}</th>
          <th></th>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map((entry) => (
          <PasswordField
            key={entry._id}
            entry={entry}
            deletehandle={deletehandle}
            onedithandle={onedithandle}
            moreClickHandle={moreClickHandle}
          />
        ))}
      </TableBody>
    </TableContainer>
  );
};
