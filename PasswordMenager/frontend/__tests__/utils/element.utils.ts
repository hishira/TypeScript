export const checkElementMatchContent = (
  elementsList: NodeListOf<HTMLElement> | [],
  ...labels: string[]
) => {
  const textContent = Array.from(elementsList).map(
    (element) => element.textContent
  );
  labels.forEach((label) => expect(textContent).toContain(label));
};
