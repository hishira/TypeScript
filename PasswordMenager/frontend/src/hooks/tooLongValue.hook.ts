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
export const TooLongValue = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const elements: HTMLTableCellElement[] | undefined = Array.from(
      ref.current?.querySelectorAll("td") || []
    );
    elements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return ()=>{
        const elements: HTMLTableCellElement[] | undefined = Array.from(
            ref.current?.querySelectorAll("td") || []
          );
          elements.forEach((element) => {
            element.removeEventListener("mouseenter", enter);
            element.removeEventListener("mouseleave", leave);
          });
    }
  }, []);
};
