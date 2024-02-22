import { useEffect, useState } from "react";
import { ComponentMapper } from "./mappers";
const SelectProperModalText = (
  action: "delete" | "activate" | "suspend" | null
) => {
  return ComponentMapper[action ?? ""];
};
export const NotificationHook = (
  modalOpen: boolean,
  action: "delete" | "activate" | "suspend" | null
) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element | undefined>(
    undefined
  );
  useEffect(() => {
    setModalOpen(modalOpen);
    setComponent(SelectProperModalText(action));
  }, [modalOpen, action]);

  return {component, isModalOpen, setModalOpen}
};
