import { useEffect } from "react";

export const EscapeModalHandle = (onclose: () => void) => {
  useEffect(() => {
    const closeModalHandle = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onclose();
      }
    };
    window.addEventListener("keyup", closeModalHandle);
    return ()=>{
        window.removeEventListener("keyup", closeModalHandle)
    }
  });
};
