import { Translation } from "../../../../../Translation";
import LastDeletedMappedEntries from "./LastDeletedMappedEntries";
import {
  Elements,
  LastDeletedElement,
  LastDeletedElements,
  LastDeletedEntryInfo,
  LastDeletedTitle,
} from "./component.styled";
import { LastDeletedEntriesHook } from "./lastDeletedEntries.hook";

export const LastDeletedElementsCardView = () => {
  const { lastDeletedEntries, setRefetch } = LastDeletedEntriesHook();

  return (
    <LastDeletedElements>
      <LastDeletedTitle>
        {Translation("account.view.lastDeletedEntries.title")}
      </LastDeletedTitle>
      <br />
      <Elements>
        <LastDeletedElement>
          <LastDeletedEntryInfo>
            <div>
              {Translation(
                "account.view.lastDeletedEntries.table.column.title"
              )}
            </div>
            <div>
              {Translation(
                "account.view.lastDeletedEntries.table.column.username"
              )}
            </div>
            <div>
              {Translation("account.view.lastDeletedEntries.table.column.url")}
            </div>
          </LastDeletedEntryInfo>
        </LastDeletedElement>
        <LastDeletedMappedEntries
          setRefetch={setRefetch}
          entries={lastDeletedEntries}
        />
      </Elements>
    </LastDeletedElements>
  );
};
