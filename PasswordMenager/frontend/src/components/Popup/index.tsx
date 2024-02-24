import { inject, observer } from "mobx-react";
import { PopUpHook } from "../../hooks/popup.hook";
import { StoreType } from "../PrivateRoute";
import { PopupContent, PopupElement, PopupHeader } from "./component.styled";
import { WarningIcon } from "../icons/WarningIcon";

interface Props extends StoreType {
  type?: PopupType;
  message?: string;
}
const PopUpTypeMapper: { [keyof in PopupType]: JSX.Element } = {
  error: <WarningIcon/>,
  info: <WarningIcon/>,
  success: <WarningIcon/>,
};
const PopUpElement = ({ type, message, store }: Props): JSX.Element => {
  const { popUpType, messagePopup, visibility } = PopUpHook(store);

  return (
    <PopupElement
      type={(popUpType.toLowerCase() as PopupType) ?? "info"}
      visible={visibility}
    >
      <PopupHeader>{PopUpTypeMapper[popUpType.toLowerCase() as PopupType]}{popUpType}</PopupHeader>
      <PopupContent>{messagePopup}</PopupContent>
    </PopupElement>
  );
};

export default inject("store")(observer(PopUpElement));
