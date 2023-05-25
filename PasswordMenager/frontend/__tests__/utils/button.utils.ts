export const getButtonWithSpecificText = (
  buttons: NodeListOf<HTMLButtonElement>,
  text: string
): HTMLButtonElement | undefined => {
  return Array.from(buttons).find((button) => button.textContent === text);
};
