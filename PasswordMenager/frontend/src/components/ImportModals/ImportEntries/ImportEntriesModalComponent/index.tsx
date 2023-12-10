import { ChangeEvent, useState } from "react";
import { ImportCheckData } from "..";
import Button from "../../../Button";
import { FileSelector } from "../../../ImportFille";
import { Translation, TranslationFunction } from "../../../Translation";
import { ImportEntries } from "./component.styled";

type ImportEntriesModalComponentProps = {
  fileSetHandle: (file: File) => void;
  importFileInfo: ImportCheckData | null;
};

const ImportEntriesModalComponent = ({
  fileSetHandle,
  importFileInfo,
}: ImportEntriesModalComponentProps) => {
  const [, fileChange] = useState<File | undefined>(undefined);
  const [filename,] = useState<string | undefined>(undefined);

  const fileChangeHandlerFunction = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files = [] } = {} } = e;
    if (files && files?.length <= 0) return;
    files && fileChange(files[0]);
    files && fileSetHandle(files[0]);
    //setFileName(selectedType);
  };
  //TODO: Add proper message for txt file types
  return (
    <ImportEntries>
      <FileSelector
        availableFileType={["csv", "txt"]}
        fileChange={fileChangeHandlerFunction}
      />
      {filename ? (
        <div>
          <span>
            {`${TranslationFunction(
              '"import.modal.selectFileType'
            )}${filename}${TranslationFunction("import.modal.fieldsMessage")}`}
          </span>
          {importFileInfo ? (
            <div>
              {Translation("import.modal.youWantToImport")}
              {importFileInfo.numberOfEntriesToAdd}
              <Button outline="without" color="transparent">
                {Translation("import.modal.button.show")}
              </Button>
              <div style={{ height: "5rem", overflow: "auto" }}>
                {importFileInfo.entiresToImport?.map((entry) => (
                  <div key={entry?.password}>
                    {entry?.password}, {entry?.username}, {entry.url}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {/*<OwnFieldsOrder>
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
          ) : null}*/}
        </div>
      ) : null}
    </ImportEntries>
  );
};

export default ImportEntriesModalComponent;
