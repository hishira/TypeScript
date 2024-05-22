import { cleanup, fireEvent, render } from "@testing-library/react";
import NewGroupComponent from "../src/components/GroupComponent/NewGroupComponent";

const buttonHandleFunctionMock = jest.fn(() => {});
const inputChangeFunctionMock = jest.fn(() => {});
const getContainer = (): HTMLElement => {
  const { container } = render(
    <NewGroupComponent
      func={inputChangeFunctionMock}
      buttonhandle={buttonHandleFunctionMock}
      isButtonDisabled={false}
    />
  );
  return container;
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("NewGroupComponent test", () => {
  it("Component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("should has input element", () => {
    const input = getContainer().querySelector("input");

    expect(input).toBeDefined();
  });

  it("should has button element", () => {
    const button = getContainer().querySelector("button");
    expect(button).toBeDefined();
  });

  it("Button should has text content 'Add group'", () => {
    const button = getContainer().querySelector("button");
    expect(button?.textContent).toBe("groups.newgroup.addgroup");
  });

  it("Should has label with proper text", () => {
    const label = getContainer().querySelector("label");
    expect(label?.textContent).toBe("groups.newgroup.groupname");
  });

  it("Input change shoult trigger proper function", () => {
    const input = getContainer().querySelector("input");
    input &&
      fireEvent.change(input, {
        target: {
          value: "Group example name",
        },
      });

    expect(inputChangeFunctionMock).toBeCalledTimes(1);
  });

  it("Button click should trigger proper action", () => {
    const button = getContainer().querySelector("button");
    button && fireEvent.click(button);
    expect(buttonHandleFunctionMock).toBeCalledTimes(1);
  });
});
