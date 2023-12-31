import { useEffect, useState } from "react";
import { TranslationFunction } from "../components/Translation";

export const NotificationMessages = (
  action: "activate" | "suspend" | "delete" | null
): { successMessage: string; errorMessage: string } => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const successSuspendMessage = TranslationFunction(
    "notification.suspend.success"
  );
  const errorSuspendMessage = TranslationFunction("notification.suspend.error");
  const successDeleteMessage = TranslationFunction(
    "notification.delete.success"
  );
  const errorDeleteMessage = TranslationFunction("notification.delete.error");
  const successActivateMessage = TranslationFunction(
    "notification.activete.success"
  );
  const errorActivateMessage = TranslationFunction(
    "notification.activete.error"
  );

  const successMessageMapper = {
    activate: successActivateMessage,
    suspend: successSuspendMessage,
    delete: successDeleteMessage,
    "": "",
  };

  const errorMessageMapper = {
    activate: errorActivateMessage,
    suspend: errorSuspendMessage,
    delete: errorDeleteMessage,
    "": "",
  };
  useEffect(() => {
    const sm = successMessageMapper[action ?? ""];
    const em = errorMessageMapper[action ?? ""];
    setSuccessMessage(sm);
    setErrorMessage(em);
  }, [action]);

  return { successMessage, errorMessage };
};
