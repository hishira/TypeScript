import { cleanup, fireEvent, render } from "@testing-library/react";
import { PasswordField } from "../src/components/PasswordTable/PasswordField";
import { GetEntryMock } from "./utils/Entry.mock";

const deleteHandleMock = jest.fn(() => {});
const oneEditHandleMock = jest.fn(() => {});
const moreClickHandleMock = jest.fn(() => {});
const entry = GetEntryMock();
const getContainer = (): HTMLElement => {
  const { container } = render(
    <PasswordField
      entry={entry}
      deletehandle={deleteHandleMock}
      onedithandle={oneEditHandleMock}
      moreClickHandle={moreClickHandleMock}
    />
  );

  return container;
};
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());
describe("PasswordField test", () => {
  it("Container should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("should has 1 tr element", () => {
    const trElements = getContainer().querySelectorAll("tr");
    expect(trElements).toHaveLength(1);
  });

  it("should has 5 td element", () => {
    const trElements = getContainer().querySelectorAll("td");
    expect(trElements).toHaveLength(5);
  });

  it("Should has 2 buttons", () => {
    const buttons = getContainer().querySelectorAll("button");

    expect(buttons).toHaveLength(3);
  });
  it("Third button should has display none", () => {
    const buttons = getContainer().querySelectorAll("button");

    expect(buttons[2]).toHaveStyle("display: none");
  });

  it("Buttons text are Delete, Edit, More", () => {
    const buttons = getContainer().querySelectorAll("button");

    ["Delete", "Edit", "More"].forEach((buttonText, index) => {
      expect(buttons[index].textContent).toBe(buttonText);
    });
  });

  it("Click delete bytton should trigger deleteHandleMock", () => {
    const buttons = getContainer().querySelectorAll("button");
    fireEvent.click(buttons[0]);
    expect(deleteHandleMock).toBeCalledTimes(1);
  });
  it("Click edit bytton should trigger oneEditHandleMock", () => {
    const buttons = getContainer().querySelectorAll("button");
    fireEvent.click(buttons[1]);
    expect(oneEditHandleMock).toBeCalledTimes(1);
  });
  it("Click more bytton should trigger moreClickHandleMock", () => {
    const buttons = getContainer().querySelectorAll("button");
    fireEvent.click(buttons[2]);
    expect(moreClickHandleMock).toBeCalledTimes(1);
  });
});
