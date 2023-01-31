import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { StoreType } from "../PrivateRoute";
import { PopupContent, PopupElement, PopupHeader } from "./component.styled";

interface Props extends StoreType {
  type?: PopupType;
  message?: string;
}
const PopUpElement = ({ type, message, store }: Props): JSX.Element => {
  const [popUpType, setPopUptype] = useState("success");
  const [messagePopup, setMessagePopup] = useState("");
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (store && store.PopUpModelInfo?.open) {
      setVisibility(true);
      setPopUptype(store.PopUpModelInfo.type.toUpperCase());
      setMessagePopup(store.PopUpModelInfo.message);
      setTimeout(
        () => store.setPopUpinfo({ open: false, message: "", type: "" }),
        1000
      );
    } else {
      setVisibility(false);
    }
  }, [store, store?.PopUpModelInfo?.open]);

  return (
    <PopupElement type={type ?? "info"} visible={visibility}>
      <PopupHeader>{popUpType}</PopupHeader>
      <PopupContent>{messagePopup}</PopupContent>
    </PopupElement>
  );
};

export default inject("store")(observer(PopUpElement));
