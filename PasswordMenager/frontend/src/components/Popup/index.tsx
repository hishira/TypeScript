import { inject, observer } from "mobx-react";
import { PopUpHook } from "../../hooks/popup.hook";
import { StoreType } from "../PrivateRoute";
import { PopupContent, PopupElement, PopupHeader } from "./component.styled";

interface Props extends StoreType {
  type?: PopupType;
  message?: string;
}
const PopUpElement = ({ type, message, store }: Props): JSX.Element => {
  const { popUpType, messagePopup, visibility } = PopUpHook(store);

  return (
    <PopupElement type={type ?? "info"} visible={visibility}>
      <PopupHeader>{popUpType}</PopupHeader>
      <PopupContent>{messagePopup}</PopupContent>
    </PopupElement>
  );
};

export default inject("store")(observer(PopUpElement));
