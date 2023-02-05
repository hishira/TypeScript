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
          <th>Title</th>
          <th>Username</th>
          <th>Password</th>
          <th>Note</th>
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
