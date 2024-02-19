import { ModalProps } from "..";
import { EscapeModalHandle } from "../../../hooks/modalEscape.hook";
import { clickOnModal } from "../../../utils/modal.utils";
import Button from "../../Button";
import { Translation } from "../../Translation";
import { Modal, ModalContainer } from "../component.styled";
import { ButtonGroup } from "./component.styled";
type AcceptanceModalPrope = ModalProps & {
  acceptHandle: (...args: any[]) => any;
  disableButton?: boolean;
  extend?: {
    buttonText: string;
    handleButton: (...args: any[]) => void;
  };
};
export const AcceptModalComponent = ({
  visible,
  component,
  onClose,
  acceptHandle,
  disableButton,
  extend,
}: AcceptanceModalPrope): JSX.Element => {
  EscapeModalHandle(onClose);

  return (
    <Modal onClick={(e) => clickOnModal(e, onClose)} visible={visible}>
      <div className="hook">
        <ModalContainer>
          {component}
          <ButtonGroup>
            <Button color='gainsboro' onClick={onClose}>
              {Translation("modal.button.cancel")}
            </Button>
            {extend ? (
              <Button
                disabled={disableButton}
                color="lightblue"
                onClick={extend.handleButton}
              >
                {Translation(extend.buttonText)}
              </Button>
            ) : (
              <Button
                disabled={disableButton}
                color="whitesmoke"
                onClick={acceptHandle}
              >
                {Translation("modal.button.accept")}
              </Button>
            )}
          </ButtonGroup>
        </ModalContainer>
      </div>
    </Modal>
  );
};
