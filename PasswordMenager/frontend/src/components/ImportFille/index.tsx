import { ChangeEvent, useState } from "react";
import { ImportFileEffect } from "../../hooks/importFile.hook";
import FormElement from "../FormElement";
import { ImportContainer, ImportInput } from "./component.styled";
type FileSelectorProps = {
  fileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  availableFileType?: string[] | string[];
};
export const FileSelector = ({
  fileChange,
  availableFileType,
}: FileSelectorProps) => {
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    //TODO: End for file type check
    if (files && files.length) {
      Array.from(files).forEach((file) => {
        console.log(file.type);
      });
    }
    fileChange(e);
  };
  return (
    <div>
      <label>Choice file</label>
      <ImportInput role="fileinput" onChange={onFileChange}></ImportInput>
    </div>
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
