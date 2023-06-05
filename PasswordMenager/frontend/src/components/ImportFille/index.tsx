import { ChangeEvent, useEffect, useState } from "react";
import { ImportContainer, ImportInput } from "./component.styled";
import FormElement from "../FormElement";
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
  useEffect(() => {
    if (!file) return;
    fileChangeHandle(file);
  }, [file]);
  // TODO: Improber add password improvement
  return (
    <ImportContainer>
      <div>
        <label>Choice file</label>
        <ImportInput
          role="fileinput"
          onChange={(e) => fileChange(e)}
        ></ImportInput>
      </div>
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
