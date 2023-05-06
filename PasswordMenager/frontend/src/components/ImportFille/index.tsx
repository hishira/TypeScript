import { ChangeEvent, useState } from "react";
import { ImportContainer, ImportInput } from "./component.styled";
import { Import } from "../../utils/import.utils";
type ImportFileProps = {
  fileChangeHandle: (...args: File[]) => void;
};
export const ImportFile = ({
  fileChangeHandle,
}: ImportFileProps): JSX.Element => {
  const [file, setFile] = useState<File>();
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length <= 0) return;
    e.target.files && setFile(e.target.files[0]);
    file && fileChangeHandle(file);
    //if (file) {
    //  const formData = new FormData();
    //  formData.set("file", file);
    //  Import.getInstance()
    //    .ImportFile(formData, file.size)
    //    .then(console.log)
    //    .catch(console.log);
    //}
  };
  return (
    <ImportContainer>
      <div></div>
      <ImportInput onChange={fileChange}></ImportInput>
    </ImportContainer>
  );
};
