import { ChangeEvent, useEffect, useState } from "react";
import { ImportContainer, ImportInput } from "./component.styled";
type ImportFileProps = {
  fileChangeHandle: (...args: File[]) => void;
};
export const ImportFile = ({
  fileChangeHandle,
}: ImportFileProps): JSX.Element => {
  const [file, setFile] = useState<File>();
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    if (files && files.length <= 0) return;
    files && setFile(files[0]);
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
        <ImportInput role='fileinput' onChange={(e) => fileChange(e)}></ImportInput>
      </div>
      <div>
        <label>Password</label>
        <input type="text" />
      </div>
    </ImportContainer>
  );
};
