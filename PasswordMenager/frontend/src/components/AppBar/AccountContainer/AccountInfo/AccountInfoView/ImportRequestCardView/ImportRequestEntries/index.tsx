import { useEffect, useState } from "react";
import {
  ImportEntriesTable,
  ImportRequestEntriesModal,
  ImportRequestHeader,
  TitleContainer,
} from "./component.styled";
import { CloseIcon } from "../../../../../../icons/CloseIcon";

export type ImportEntriesProprs = {
  entries: EntriesToImport[];
  closeHandle: () => void;
};
export const ImportRequestEntries = ({ entries, closeHandle }: ImportEntriesProprs) => {
  const [mappedEntries, setMappedEntries] = useState<EntriesToImport[]>([]);

  useEffect(() => {
    setMappedEntries(
      entries.map((e) => ({
        email: (e.email === "" ? "-" : e.email) ?? "-",
        password: (e.password === "" ? "-" : e.password) ?? "-",
        title: (e.title === "" ? "-" : e.title) ?? "-",
        url: (e.url === "" ? "-" : e.url) ?? "-",
        username: (e.username === "" ? "-" : e.username) ?? "-",
      }))
    );
  }, [entries]);

  return (
    <ImportRequestEntriesModal>
      <TitleContainer>
        <span>Entries to import</span> <CloseIcon click={closeHandle} />
      </TitleContainer>
      <ImportRequestHeader>
        <div>Email</div>
        <div>Username</div>
        <div>Password</div>
        <div>title</div>
        <div>url</div>
      </ImportRequestHeader>
      <ImportEntriesTable>
        {mappedEntries.map((e) => (
          <ImportRequestHeader key={e.email}>
            <div>{e.email}</div>
            <div>{e.username}</div>
            <div>{e.password}</div>
            <div>{e.title}</div>
            <div>{e.url}</div>
          </ImportRequestHeader>
        ))}
      </ImportEntriesTable>
    </ImportRequestEntriesModal>
  );
};
