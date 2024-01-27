import { ChangeEvent, useState } from "react";
import FormElement from "../../FormElement";
import { SearchContainer } from "../component.styled";

export const FieldSearchInput = ({
  onSearchFieldChange,
}: SearchFiledInputProps) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [serachFieldValue, setSerachFieldValue] = useState<string>("");
  const searchChangeFunction = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => functionInputChange(e), 1000));
    setSerachFieldValue(e.target.value);
  };

  const functionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchFieldChange(e.target.value);
  };
  return (
    <SearchContainer>
      <FormElement
        label={""}
        inputplaceholder="searchinput.searchByTitle"
        inputChange={searchChangeFunction}
        inputtype="txt"
        value={serachFieldValue}
      />
    </SearchContainer>
  );
};
