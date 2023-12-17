import { useEffect, useState } from "react";
import { IGeneral } from "../models/General";

export const PopUpHook = (store?: IGeneral) => {
  const [popUpType, setPopUptype] = useState("success");
  const [messagePopup, setMessagePopup] = useState("");
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (store?.PopUpModelInfo?.open) {
      setVisibility(true);
      setPopUptype(store.PopUpModelInfo.type.toUpperCase());
      setMessagePopup(store.PopUpModelInfo.message);
      setTimeout(
        () => store.setPopUpinfo({ open: false, message: "", type: "" }),
        2000
      );
    } else {
      setVisibility(false);
    }
  }, [store, store?.PopUpModelInfo?.open]);

  return { popUpType, messagePopup, visibility };
};
