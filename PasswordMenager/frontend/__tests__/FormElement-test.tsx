import { cleanup, render } from "@testing-library/react";
import FormElement from "../src/components/FormElement";
const onChangeForm = jest.fn(() => {});
const getContainer = (): HTMLElement => {
  const { container } = render(
    <FormElement
      label=""
      inputChange={onChangeForm}
      inputtype="text"
      inputplaceholder=""
      value={""}
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
});
