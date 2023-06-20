import { ChangeEvent, useState } from "react";
import { ImportFileEffect } from "../../hooks/importFile.hook";
import FormElement from "../FormElement";
import {
  ErrorMessasge,
  FileSelectorComponent,
  ImportContainer,
  ImportInput,
} from "./component.styled";
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

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    //TODO: End for file type check
    if (files && files.length) {
      const selectedTypes = Array.from(files).map((file) => file.type);
      console.log(availableFileType);
      if (availableFileType) {
        console.log(
          selectedTypes.some(
            (currentfileType) =>
              !availableFileType.filter((fileType) =>
                currentfileType.toLowerCase().includes(fileType.toLowerCase())
              ).length
          )
        );
        setIsWrongType(
          selectedTypes.some(
            (currentfileType) =>
              !availableFileType.filter((fileType) =>
                currentfileType.toLowerCase().includes(fileType.toLowerCase())
              ).length
          )
        );
      }
    }
    fileChange(e);
  };

  return (
    <FileSelectorComponent>
      <div>
        <label>Choice file</label>
        <ImportInput role="fileinput" onChange={onFileChange}></ImportInput>
      </div>
      {isWrongType ? <ErrorMessasge>Wrong file type</ErrorMessasge> : null}
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
    console.log(files);
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
          label={"Password"}
          inputplaceholder="***"
          inputChange={passwordChange}
          inputtype="password"
          value={password}
        />
      </div>
    </ImportContainer>
  );
};
