import { ChangeEvent, useState } from "react";
import { ImportCheckData } from "..";
import Button from "../../../Button";
import { FileSelector, PossibleFileType } from "../../../ImportFille";
import { Translation, TranslationFunction } from "../../../Translation";
import { ImportEntries } from "./component.styled";
import { TitleContainer } from "../../../shared/styled-components";

type ImportEntriesModalComponentProps = {
  fileSetHandle: (file: File) => void;
  importFileInfo: ImportCheckData | null;
};

const ImportEntriesModalComponent = ({
  fileSetHandle,
  importFileInfo,
}: ImportEntriesModalComponentProps) => {
  const [, fileChange] = useState<File | undefined>(undefined);
  const [filename] = useState<string | undefined>(undefined);
  const availabeFileType = [
    PossibleFileType.CSV,
    PossibleFileType.JSON,
    PossibleFileType.ApplicationJson,
    PossibleFileType.TextCsv,
  ];
  const fileChangeHandlerFunction = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const { target: { files = [] } = {} } = e;
    if (files && files?.length <= 0) return;
    files && fileChange(files[0]);
    files && fileSetHandle(files[0]);
    //setFileName(selectedType);
  };
  //TODO: Add proper message for txt file types
  return (
    <ImportEntries>
      <TitleContainer>Import entries</TitleContainer>
      <FileSelector
        availableFileType={availabeFileType}
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
        </div>
      ) : null}
    </ImportEntries>
  );
};

export default ImportEntriesModalComponent;
