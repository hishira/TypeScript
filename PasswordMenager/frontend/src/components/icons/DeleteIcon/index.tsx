import { SVGProps } from "react";
import { IconProps } from "../type";

export const DeleteIcon = ({ click }: IconProps) => {
  const props: SVGProps<SVGSVGElement> = {};
  if (click) {
    props["onClick"] = click;
  }
  return (
    <svg
      {...props}
      height="24px"
      role="delete"
      viewBox="0 0 48 48"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#3b3b3b"
        d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"
      />
      <path d="M0 0h48v48H0z" fill="none" />
    </svg>
  );
};
