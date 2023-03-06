import React, { useState } from "react";
import { ExportEntriesCsv } from "../../api/export.api";
import { SessionStorage } from "../../utils/localstorage.utils";
import Button from "../Button";
import Modal from "../Modal/";
import NewEntryComponent from "../NewEntryComponent/index";
import { Container } from "./component.styled";

const PassBar: React.FC = (): JSX.Element => {
  const [modalopen, setmodalopen] = useState<boolean>(false);
  const closehandle = (): void => setmodalopen(false);
  const exportHandle = (): void => {
    const accesstoken = SessionStorage.getInstance().getAccessToken();
    ExportEntriesCsv(accesstoken).then(() => {});
  };
  return (
    <Container>
      <Modal
        visible={modalopen}
        onClose={closehandle}
        component={<NewEntryComponent refreshentry={false} />}
      />
      <Button color="lightgray" onClick={() => setmodalopen(true)}>
        New entry
      </Button>
      <Button color="lightgray" onClick={exportHandle}>
        Export entries
      </Button>
    </Container>
  );
};

export default PassBar;
