import { useEffect, useState } from "react";
import { PopupContent, PopupElement, PopupHeader } from "./component.styled";

type Props = {
  type: PopupType;
  message: string;
};
const PopUpElement = ({ type, message }: Props): JSX.Element => {
  const [popUpType, setPopUptype] = useState("success");

  useEffect(() => {
    setPopUptype(type);
  }, [setPopUptype, type]);
  return (
    <PopupElement type={type}>
      <PopupHeader>{popUpType}</PopupHeader>
      <PopupContent>{message}</PopupContent>
    </PopupElement>
  );
};

export default PopUpElement;
