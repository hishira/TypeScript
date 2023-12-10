import { RefObject, useEffect } from "react";

const enter = (event: MouseEvent) => {
  const element = event.target;
  if (element instanceof HTMLTableCellElement) {
    const firstChild = element.children.item(0);
    const currentOffset = element.offsetWidth;
    if (
      firstChild instanceof HTMLSpanElement &&
      currentOffset < firstChild.offsetWidth
    ) {
      const positionFromLeft =
        firstChild.getBoundingClientRect().left + window.screenLeft;
      element.classList.toggle("class");
      const condition: boolean =
        positionFromLeft + firstChild.offsetWidth < window.outerWidth;
      condition
        ? firstChild.classList.toggle("secondClass")
        : firstChild.classList.toggle("thirdClass");
    }
  }
};

const leave = (event: MouseEvent) => {
  const element = event.target;
  if (element instanceof HTMLTableCellElement) {
    const firstChild = element.children.item(0);
    const currentOffset = element.offsetWidth;
    if (
      firstChild instanceof HTMLSpanElement &&
      currentOffset < firstChild.offsetWidth
    ) {
      element.classList.toggle("class");

      firstChild.classList.remove("secondClass");
      firstChild.classList.remove("thirdClass");
    }
  }
};

const addRemoveFunction = (
  currentReference: HTMLElement | null,
  actionType: "remove" | "add"
) => {
  const elements: HTMLTableCellElement[] | undefined = Array.from(
    currentReference?.querySelectorAll("td") || []
  );
  elements.forEach((element) => {
    actionType === "add"
      ? element.addEventListener("mouseenter", enter)
      : element.removeEventListener("mouseenter", enter);
    actionType === "add"
      ? element.addEventListener("mouseleave", leave)
      : element.removeEventListener("mouseleave", leave);
  });
};

export const TooLongValue = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const currentReference: HTMLElement | null = ref?.current;
    addRemoveFunction(currentReference, "add");

    return () => addRemoveFunction(currentReference, "remove");
  }, [ref]);
};
