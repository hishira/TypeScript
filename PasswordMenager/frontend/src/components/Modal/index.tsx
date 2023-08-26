import { EscapeModalHandle } from "../../hooks/modalEscape.hook";
import { clickOnModal } from "../../utils/modal.utils";
import { Modal } from "./component.styled";
export type ModalProps = {
  visible?: boolean;
  component?: JSX.Element;
  onClose: () => void;
};
const ModalComponent = ({
  visible,
  component,
  onClose,
}: ModalProps): JSX.Element => {
  EscapeModalHandle(onClose);
  return visible ? (
    <Modal onClick={(e) => clickOnModal(e, onClose)} visible={visible}>
      <div className="hook">{component}</div>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalComponent;
