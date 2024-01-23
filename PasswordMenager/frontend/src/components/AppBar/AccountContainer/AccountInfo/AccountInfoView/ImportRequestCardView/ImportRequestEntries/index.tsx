import { useEffect, useState } from "react";
import { Translation } from "../../../../../../Translation";
import { CloseIcon } from "../../../../../../icons/CloseIcon";
import {
  ImportEntriesTable,
  ImportRequestEntriesModal,
  ImportRequestHeader,
  TitleContainer,
} from "./component.styled";
import { MapEntries } from "./utils";

export type ImportEntriesProprs = {
  entries: EntriesToImport[];
  closeHandle: () => void;
};
export const ImportRequestEntries = ({
  entries,
  closeHandle,
}: ImportEntriesProprs) => {
  const [mappedEntries, setMappedEntries] = useState<EntriesToImport[]>([]);

  useEffect(() => {
    setMappedEntries(entries.map(MapEntries));
  }, [entries]);

  return (
    <ImportRequestEntriesModal>
      <TitleContainer>
        <span>{Translation("entriesToImport")}</span>{" "}
        <CloseIcon click={closeHandle} />
      </TitleContainer>
      <ImportRequestHeader>
        <div>{Translation("userinformation.email")}</div>
        <div>
          {Translation("account.view.lastDeletedEntries.table.column.username")}
        </div>
        <div>{Translation("newentry.field.password")}</div>
        <div>{Translation("entries.table.column.title")}</div>
        <div>
          {Translation("account.view.lastDeletedEntries.table.column.url")}
        </div>
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
