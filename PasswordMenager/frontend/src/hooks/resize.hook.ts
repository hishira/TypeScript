import { Dispatch, SetStateAction, useEffect } from "react";
import { EMPTYENTRYRESPONSE } from "../utils/constans.utils";

export const ResizeWindowsHandle = (
  openModalHandle: Dispatch<SetStateAction<boolean>>,
  setEntryHandle: Dispatch<SetStateAction<IEntry>>
) => {
  useEffect(() => {
    const resizeHandleFunction = () => {
      if (window.innerWidth > 708) {
        openModalHandle(false);
        setEntryHandle(EMPTYENTRYRESPONSE);
      }
    };
    window.addEventListener("resize", resizeHandleFunction);
    return () => {
      window.removeEventListener("resize", resizeHandleFunction);
    };
  }, []);
};
