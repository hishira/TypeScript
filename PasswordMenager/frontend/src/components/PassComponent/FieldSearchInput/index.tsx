import { ChangeEvent, useState } from "react";
import FormElement from "../../FormElement";
import { SearchContainer } from "../component.styled";

export const FieldSearchInput = ({
  onSearchFieldChange,
}: SearchFiledInputProps) => {
  const [serachFieldValue, setSerachFieldValue] = useState<string>("");
  const searchChangeFunction = (e: ChangeEvent<HTMLInputElement>) => {
    setSerachFieldValue(e.target.value);
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
