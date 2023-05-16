import { cleanup, render } from "@testing-library/react";
import FormComponent from "../src/components/Form";

const BUTTONMESSAGE = "Form message";
const buttonHandleFunctionMock = jest.fn(() => {});
const firstInputHandleFunctionMock = jest.fn(() => {});
const secondInputHandleFunctionMock = jest.fn(() => {});
const SECONDACTIONMESSAGE = "Second action message";
const redirectFunctionMock = jest.fn(() => {});
const MAINTITLEMESSAGE = "Component title";
const CONFIRMPASSWORD = false;
const getContainer = (): HTMLElement => {
  const { container } = render(
    <FormComponent
      buttonmessage={BUTTONMESSAGE}
      buttonHandle={buttonHandleFunctionMock}
      firstinputhandle={firstInputHandleFunctionMock}
      secondinputhandle={secondInputHandleFunctionMock}
      secondactionastirng={SECONDACTIONMESSAGE}
      redirectfunction={redirectFunctionMock}
      maintitle={MAINTITLEMESSAGE}
    />
  );

  return container;
};

afterEach(cleanup);

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
});
