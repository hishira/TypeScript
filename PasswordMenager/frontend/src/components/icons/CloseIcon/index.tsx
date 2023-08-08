import { SVGProps } from "react";
import { IconProps } from "../type";

export const CloseIcon = ({ click }: IconProps) => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg
      {...props}
      height="20px"
      viewBox="0 0 48 48"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
      <path d="M0 0h48v48h-48z" fill="none" />
    </svg>
  );
};
