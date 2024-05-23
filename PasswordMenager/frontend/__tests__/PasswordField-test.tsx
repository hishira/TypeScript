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

    expect(buttons).toHaveLength(1);
  });

  it("Buttons text are Delete, Edit, More", () => {
    const buttons = getContainer().querySelectorAll("button");

    ["entries.table.button.more"].forEach(
      (buttonText, index) => {
        expect(buttons[index].textContent).toBe(buttonText);
      }
    );
  });
});
