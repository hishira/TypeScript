import { useEffect, useRef } from "react";
import {
  MinButton,
  TableButton,
  TableComponent,
  TableRow,
} from "./component.styled";

const PasswordFieldsHelper = {
  gettext: (text: string | null): string => {
    return text ? text : "";
  },
  passwordClick: (entry: IEntry): void => {
    let elementpass: HTMLElement | null = document.getElementById(
      `${entry._id}${entry.groupid}`
    );
    console.log(elementpass);
    if (elementpass !== null) {
      navigator.clipboard
        .writeText(PasswordFieldsHelper.gettext(entry.password))
        .then(() => console.log("ok"))
        .catch((e) => console.log("not ok"));
    }
  },
};
type PasswordFieldType = {
  entry: IEntry;
  deletehandle: Function;
  onedithandle: Function;
  moreClickHandle: Function;
};
export const PasswordField = ({
  entry,
  deletehandle,
  onedithandle,
  moreClickHandle,
}: PasswordFieldType) => {
  useEffect(() => {
    // TODO: Refactor and think of use other css to make it
    const elements: HTMLTableCellElement[] | undefined = Array.from(
      TableRefComponent.current?.querySelectorAll("td") || []
    );
    elements.forEach((element) => {
      const currentOffset = element.offsetWidth;
      const firstChild = element.children.item(0);
      
      if (
        firstChild instanceof HTMLSpanElement &&
        currentOffset < firstChild.offsetWidth
      ) {
        const positionFromLeft = firstChild.getBoundingClientRect().left + window.screenLeft
        
        element.addEventListener("mouseenter", () => {
          element.classList.toggle("class");
          positionFromLeft + firstChild.offsetWidth < window.outerWidth ?
            firstChild.classList.toggle("secondClass")  :
            firstChild.classList.toggle('thirdClass')
        });
        element.addEventListener("mouseleave", () => {
          element.classList.toggle("class");
          positionFromLeft + firstChild.offsetWidth < window.outerWidth ?
            firstChild.classList.toggle("secondClass")  :
            firstChild.classList.toggle('thirdClass')
        });
      }
    });
  }, []);
  const TableRefComponent = useRef<HTMLTableRowElement>(null);
  return (
    <TableRow ref={TableRefComponent} key={entry._id}>
      <TableComponent>
        <span>{entry.title}</span>
      </TableComponent>
      <TableComponent>
        {" "}
        <span>{entry.username} </span>
      </TableComponent>
      <TableComponent
        id={`${entry._id}${entry.groupid}`}
        onClick={() => [PasswordFieldsHelper.passwordClick(entry)]}
        password
        placeholder="*****"
      >
        *****
      </TableComponent>
      <TableComponent>
        {" "}
        <span>{entry.note}</span>
      </TableComponent>
      <TableComponent>
        <TableButton onClick={() => deletehandle(entry._id)} color="lightblue">
          Delete
        </TableButton>
        <TableButton
          color="lightgrey"
          onClick={() => onedithandle(entry._id)}
          style={{ marginLeft: ".4rem" }}
        >
          Edit
        </TableButton>
        <MinButton onClick={() => moreClickHandle(entry)}>More</MinButton>
      </TableComponent>
    </TableRow>
  );
};
