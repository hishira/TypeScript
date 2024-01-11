import { useEffect, useState } from "react";
import {
  ImportEntriesTable,
  ImportRequestEntriesModal,
  ImportRequestHeader,
  TitleContainer,
} from "./component.styled";

type ImportEntriesProprs = {
  entries: EntriesToImport[];
};
export const ImportRequestEntries = ({ entries }: ImportEntriesProprs) => {
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
      <TitleContainer>Entries to import</TitleContainer>
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
