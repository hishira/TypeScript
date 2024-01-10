import {
  ImportRequestEntriesModal,
  ImportRequestHeader,
} from "./component.styled";

type ImportEntriesProprs = {
  entries: EntriesToImport[];
};
export const ImportRequestEntries = ({ entries }: ImportEntriesProprs) => {
  return (
    <ImportRequestEntriesModal>
      <ImportRequestHeader>
        <div>Email</div>
        <div>Username</div>
        <div>Password</div>
        <div>title</div>
        <div>url</div>
      </ImportRequestHeader>
      <div>
        {entries.map((e) => (
          <ImportRequestHeader>
            <div>{e.email}</div>
            <div>{e.username}</div>
            <div>{e.password}</div>
            <div>{e.title}</div>
            <div>{e.url}</div>
          </ImportRequestHeader>
        ))}
      </div>
    </ImportRequestEntriesModal>
  );
};
