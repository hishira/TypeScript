import { cleanup, fireEvent, render } from "@testing-library/react";
import FormElement from "../src/components/FormElement";
const onChangeForm = jest.fn(() => {});
const LabexText = "Label test";
const InputType = "text";
const InitialValue = "";
const getContainer = (): HTMLElement => {
  const { container } = render(
    <FormElement
      label={LabexText}
      inputChange={onChangeForm}
      inputtype={InputType}
      inputplaceholder=""
      value={InitialValue}
    />
  );

  return container;
};

const getInput = (): HTMLInputElement | null => {
  const container = getContainer();

  return container.querySelector("input");
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("FormElement component", () => {
  it("Should contain input element", () => {
    expect(getInput()).toBeDefined();
  });

  it("Should containe label", () => {
    const container = getContainer();
    const label = container.querySelector("label");
    expect(label).toBeDefined();
  });

  it("Label should container proper text", () => {
    const container = getContainer();
    const label = container.querySelector("label");
    expect(label?.textContent).toBe(LabexText);
  });

  it("Input change should triger run props inputChange function", () => {
    const input = getInput();
    input && fireEvent.change(input, { target: { value: "example values" } });
    expect(onChangeForm).toBeCalledTimes(1);
  });

  it("Input should has proper type", () => {
    expect(getInput()?.getAttribute("type")).toBe(InputType);
  });
});
