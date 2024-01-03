import { ChangeEvent, useState } from "react";
import { ImportFileEffect } from "../../hooks/importFile.hook";
import FormElement from "../FormElement";
import {
  ErrorMessasge,
  FileSelectorComponent,
  ImportContainer,
  ImportInput,
} from "./component.styled";
import { Translation, TranslationFunction } from "../Translation";
type PossibleFiles = `${PossibleFileType}`;
enum PossibleFileType {
  JPG = "jpeg",
  PNG = "png",
  CSV = "csv",
  TXT = "txt",
}
type FileSelectorProps = {
  fileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  availableFileType?: PossibleFiles[];
};

export const FileSelector = ({
  fileChange,
  availableFileType,
}: FileSelectorProps) => {
  const [isWrongType, setIsWrongType] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("Wrong file type");
  const message = `${TranslationFunction(
    "import.modal.errorMessage"
  )}${availableFileType?.join(", ")}`;
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    if (!files || (files && files.length === 0)) return;
    const selectedTypes = Array.from(files).map((file) => file.type);
    if (!availableFileType || availableFileType.length === 0) return;
    const isWrongType = selectedTypes.some(
      (currentfileType) =>
        !availableFileType.filter((fileType) =>
          currentfileType.toLowerCase().includes(fileType.toLowerCase())
        ).length
    );
    setIsWrongType(isWrongType);
    isWrongType && setErrorMessage(message);

    fileChange(e);
  };

  return (
    <FileSelectorComponent>
      <div>
        <label>{Translation("import.modal.choiceFile")}</label>
        <ImportInput role="fileinput" onChange={onFileChange}></ImportInput>
      </div>
      {isWrongType ? <ErrorMessasge>{errorMessage}</ErrorMessasge> : null}
    </FileSelectorComponent>
  );
};
type ImportFileProps = {
  fileChangeHandle: (...args: File[]) => void;
};
export const ImportFile = ({
  fileChangeHandle,
}: ImportFileProps): JSX.Element => {
  const [file, setFile] = useState<File>();
  const [password, setPassword] = useState<string>("");
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    if (files && files.length <= 0) return;
    files && setFile(files[0]);
  };
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  ImportFileEffect(fileChangeHandle, file);
  // TODO: Improber add password improvement
  return (
    <ImportContainer>
      <FileSelector fileChange={(e) => fileChange(e)} />
      <div>
        <FormElement
          label={TranslationFunction("input.label.password")}
          inputplaceholder="***"
          inputChange={passwordChange}
          inputtype="password"
          value={password}
        />
      </div>
    </ImportContainer>
  );
};
