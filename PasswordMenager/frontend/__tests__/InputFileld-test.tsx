import { cleanup, fireEvent, render } from "@testing-library/react";
import InputField from "../src/components/InputField";
import React from "react";
const staticObject: any = { inputValue: null };
const onChangeInput = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => {
  staticObject.inputValue = e.target.value;
});
const getContainer = (): HTMLElement => {
  const { container } = render(
    <InputField onChange={onChangeInput} placeholder="" type="text" />
  );
  return container;
};

const getPredefinedValueContainer = (): HTMLElement => {
  const { container } = render(
    <InputField
      onChange={onChangeInput}
      placeholder=""
      type="text"
      value="123"
    />
  );
  return container;
};
const getInput = (): HTMLInputElement | null => {
  const container = getContainer();
  const input = container.querySelector("input");

  return input;
};
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());
describe("InputField component", () => {
  it("Container should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("Input inside container should be defined", () => {
    expect(getInput()).toBeDefined();
  });

  it("Input should has value like in props", () => {
    const container = getPredefinedValueContainer();
    const input = container.querySelector("input");

    expect(input?.value).toBe("123");
  });

  it("Input change should trigger props function", () => {
    const input = getInput();
    input &&
      fireEvent.change(input, { target: { value: "Something new value" } });
    expect(onChangeInput).toBeCalledTimes(1);
    expect(staticObject.inputValue).toBe("Something new value");
  });
});
