import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImportFile } from "../src/components/ImportFille/index";
const fileChange = jest.fn();
const getContainer = (): HTMLElement => {
  const { container } = render(<ImportFile fileChangeHandle={fileChange} />);

  return container;
};

const getInputElement = (): HTMLInputElement | null => {
  const container = getContainer();
  const input = container.querySelector("input");
  return input;
};
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());
describe("ImportFile component test", () => {
  it("Should have input", () => {
    const container = getContainer();
    expect(container.querySelector("input")).toBeTruthy();
  });

  it("Input should be type password", () => {
    const input = getInputElement();
    const type = input?.getAttribute("type");
    expect(type).toBe("file");
  });

  it("Should work file change", () => {
    const file = new File(["100100100"], "exampleoffile.png", {
      type: "image/png",
    });
    const input = getInputElement();
    input && userEvent.upload(input, file);
    expect(input?.files).toHaveLength(1);
  });

  it("File from state is setting", () => {
    const file = new File(["100100100"], "exampleoffile.png", {
      type: "image/png",
    });
    const input = getInputElement();

    input && userEvent.upload(input, file);
    expect(input?.files?.[0].name).toBe("exampleoffile.png");
  });

  it("File change should trigger filechange function", () => {
    const file = new File(["1200123012"], "exampleoffile.png", {
      type: "image/png",
    });
    const input = getInputElement();
    input && userEvent.upload(input, file);
    expect(fileChange).toBeCalledTimes(1);
  });

  it("Component should has 2 labels", () => {
    const container = getContainer();
    const labels = container.querySelectorAll("label");
    expect(labels).toHaveLength(2);
  });

  it("Component should has 2 input", () => {
    const container = getContainer();
    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(2);
  });

  it("Should exists input with password type", () => {
    const container = getContainer();
    const input = container.querySelector("input[type=password]");
    expect(input).toBeTruthy();
  });
});
