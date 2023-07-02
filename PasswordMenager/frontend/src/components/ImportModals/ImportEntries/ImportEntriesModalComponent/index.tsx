import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FileSelector } from "../../../ImportFille";
import { CheckBox, ImportEntries, OwnFieldsOrder } from "./component.styled";
import FormElement from "../../../FormElement";

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
  const [ownFieldOrder, setOwnFieldOrder] = useState<boolean>(false);
  const [fieldsNumber, setFieldsNumber] = useState<number>(1);
  const FileChangeHandle = new ImportEntriesComponent(
    ...useState<File | undefined>(),
    ...useState<string | undefined>(undefined),
    {
      fileSetHandle: fileSetHandle,
      possibleTypes: ["csv", "txt"],
    }
  );

  const fileChangeHandle = FileChangeHandle.fileChange.bind(FileChangeHandle);
  //TODO: Add proper message for txt file types
  return (
    <ImportEntries>
      <FileSelector
        availableFileType={FileChangeHandle.importEntriesHelper.possibleTypes}
        fileChange={fileChangeHandle}
      />
      {FileChangeHandle.fileType ? (
        <div>
          <span>
            {`Selected file type ${FileChangeHandle.fileType}`}, fields should
            be in proper order name, site(in future), username - email,
            password,note.
          </span>
          <OwnFieldsOrder>
            <span>Select own order of field</span>
            <CheckBox
              defaultChecked={ownFieldOrder}
              onChange={(e) => setOwnFieldOrder(!ownFieldOrder)}
            />
          </OwnFieldsOrder>
          {ownFieldOrder ? (
            <div>
              <FormElement
                label={"Fields number"}
                inputplaceholder="Fields number"
                inputChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFieldsNumber(parseInt(e.target.value))
                }
                inputtype="number"
                value={fieldsNumber}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </ImportEntries>
  );
};

export default ImportEntriesModalComponent;
