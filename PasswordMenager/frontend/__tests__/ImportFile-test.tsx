import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImportFile } from "../src/components/ImportFille/index";
const fileChange = (...args: File[]): void => {
  if (args.length <= 0) return;
};
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
describe("ImportFile component test", () => {
  it("Should have input", () => {
    const container = getContainer();
    expect(container.querySelector("input")).toBeTruthy();
    //export(container.querySelector)
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
    expect(input?.files[0].name).toBe("exampleoffile.png");
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

  it("Should exists input with text type", () => {
    const container = getContainer();
    const input = container.querySelector("input[type=text]");
    expect(input).toBeTruthy();
  });
});
