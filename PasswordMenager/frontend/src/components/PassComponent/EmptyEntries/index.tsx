import { Translation } from "../../Translation";
import { EmptyEntries, Text } from "../component.styled";

export const EmptyEntriesComponent = () => {
  return (
    <EmptyEntries>
      <Text>{Translation("entries.noEntriesAvailable")}</Text>
    </EmptyEntries>
  );
};
