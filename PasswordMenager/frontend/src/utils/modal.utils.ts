export const clickOnModal = (
  event: React.MouseEvent,
  onClose: () => void
): void => {
  const targetelement: Element = event.target as Element;
  for (let i of targetelement.childNodes) {
    if (
      (i as Element).classList !== undefined &&
      (i as Element).classList[0] === "hook"
    )
      onClose();
  }
};
