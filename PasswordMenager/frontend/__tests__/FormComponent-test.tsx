import { cleanup, fireEvent, render } from "@testing-library/react";
import FormComponent from "../src/components/Form";

const BUTTONMESSAGE = "Form message";
const buttonHandleFunctionMock = jest.fn(() => {});
const firstInputHandleFunctionMock = jest.fn(() => {});
const secondInputHandleFunctionMock = jest.fn(() => {});
const SECONDACTIONMESSAGE = "Second action message";
const redirectFunctionMock = jest.fn(() => {});
const confirmpasshandleMock = jest.fn(() => {});
const MAINTITLEMESSAGE = "Component title";
const CONFIRMPASSWORD = false;
const getContainer = (confirmPassword?: boolean): HTMLElement => {
  const { container } = render(
    <FormComponent
      buttonmessage={BUTTONMESSAGE}
      buttonHandle={buttonHandleFunctionMock}
      firstinputhandle={firstInputHandleFunctionMock}
      secondinputhandle={secondInputHandleFunctionMock}
      secondactionastirng={SECONDACTIONMESSAGE}
      redirectfunction={redirectFunctionMock}
      maintitle={MAINTITLEMESSAGE}
      {...(confirmPassword && {
        confirmpassword: true,
        confirmpasshandle: confirmpasshandleMock,
      })}
    />
  );

  return container;
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());
describe("FormComponent test", () => {
  it("It should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("Should has proper title", () => {
    const pElement = getContainer().querySelector("p");
    expect(pElement?.textContent).toBe(MAINTITLEMESSAGE);
  });

  it("Should has 2 input element without confirm password property", () => {
    const inputs = getContainer().querySelectorAll("input");
    expect(inputs).toHaveLength(2);
  });

  it("Button should has proper text message", () => {
    const button = getContainer().querySelector("button");
    expect(button?.textContent).toBe(BUTTONMESSAGE);
  });

  it("Should has proper label, Login and Password", () => {
    const labels = getContainer().querySelectorAll("label");
    ["Login", "Password"].forEach((label, index) => {
      expect(labels[index].textContent).toBe(label);
    });
  });

  it("Button click should fire buttonHandle event", () => {
    const button = getContainer().querySelector("button");
    button && fireEvent.click(button);
    expect(buttonHandleFunctionMock).toBeCalledTimes(1);
  });

  it("Login input change should trigger firstinputhandle", () => {
    const inputs = getContainer().querySelectorAll("input");
    fireEvent.change(inputs[0], {
      target: {
        value: "example",
      },
    });
    expect(firstInputHandleFunctionMock).toBeCalledTimes(1);
  });
  it("Password input change should trigger firstinputhandle", () => {
    const inputs = getContainer().querySelectorAll("input");
    fireEvent.change(inputs[1], {
      target: {
        value: "example",
      },
    });
    expect(secondInputHandleFunctionMock).toBeCalledTimes(1);
  });
  it("Confirm password Login input change should trigger firstinputhandle", () => {
    const inputs = getContainer(true).querySelectorAll("input");
    fireEvent.change(inputs[2], {
      target: {
        value: "example",
      },
    });
    expect(confirmpasshandleMock).toBeCalledTimes(1);
  });

  it("With confirm password it should be 3 input", () => {
    const inputs = getContainer(true).querySelectorAll("input");
    expect(inputs).toHaveLength(3);
  });

  it('With confirm password it should has 3 labels', ()=>{
    const labels = getContainer(true).querySelectorAll("label");
    ["Login", "Password", "Confirm password"].forEach((label, index) => {
      expect(labels[index].textContent).toBe(label);
    });
  })
});
