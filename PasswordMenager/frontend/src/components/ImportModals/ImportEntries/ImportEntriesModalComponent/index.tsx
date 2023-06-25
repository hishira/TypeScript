import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FileSelector } from "../../../ImportFille";
import { ImportEntries } from "./component.styled";

type ImportEntriesModalComponentProps = {
  fileSetHandle: (file: File) => void;
};

type ImportEntriesHelper = {
  fileSetHandle: (file: File) => void;
  possibleTypes: ("csv" | "txt" | "jpeg" | "png")[];
};
class ImportEntriesComponent {
  importEntriesHelper: ImportEntriesHelper;
  constructor(
    public file: File | undefined,
    public setFile: Dispatch<SetStateAction<File | undefined>>,
    public fileType: string | undefined,
    public setFileType: Dispatch<SetStateAction<string | undefined>>,
    handler: ImportEntriesHelper
  ) {
    this.importEntriesHelper = handler;
  }

  fileChange(e: ChangeEvent<HTMLInputElement>) {
    const { target: { files = [] } = {} } = e;
    if (files && files?.length <= 0) return;
    files && this.setFile(files[0]);
    files && this.importEntriesHelper.fileSetHandle(files[0]);
    const fileType = files && files[0].type;
    const selectedType = this.importEntriesHelper.possibleTypes.find((ft) =>
      fileType?.toLowerCase().includes(ft)
    );
    this.setFileType(selectedType);
  }
}
const ImportEntriesModalComponent = ({
  fileSetHandle,
}: ImportEntriesModalComponentProps) => {
  const FileChangeHandle = new ImportEntriesComponent(
    ...useState<File | undefined>(),
    ...useState<string | undefined>(undefined),
    {
      fileSetHandle: fileSetHandle,
      possibleTypes: ["csv", "txt"],
    }
  );

  //TODO: Add proper message for txt file types
  return (
    <ImportEntries>
      <FileSelector
        availableFileType={FileChangeHandle.importEntriesHelper.possibleTypes}
        fileChange={FileChangeHandle.fileChange.bind(FileChangeHandle)}
      />
      {FileChangeHandle.fileType ? (
        <div>
          {`Selected file type ${FileChangeHandle.fileType}`}, fields must be in
          proper order, username, password,note.{" "}
        </div>
      ) : null}
    </ImportEntries>
  );
};

export default ImportEntriesModalComponent;
