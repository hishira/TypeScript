import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { ImportFile } from "../src/components/ImportFille/index";
import userEvent from "@testing-library/user-event";
const fileChange = (...args: File[]): void => {
  if (args.length <= 0) return;
  //const file = args[0];
  //if (file) {
  //  const formData = new FormData();
  //  formData.set("file", file);
  //  formData.set("password", "example_password_to_decrypt_data");
  //  setFormData(formData);
  //}
};

afterEach(cleanup);
describe("ImportFile component test", () => {
  it("Should have input", () => {
    const { container } = render(<ImportFile fileChangeHandle={fileChange} />);

    expect(container.querySelector("input")).toBeTruthy();
    //export(container.querySelector)
  });
  it("Input should be type password", () => {
    const { container } = render(<ImportFile fileChangeHandle={fileChange} />);
    const input = container.querySelector("input");
    const type = input?.getAttribute("type");
    expect(type).toBe("file");
  });

  it("Should work file change", () => {
    const file = new File(["100100100"], "exampleoffile.png", {
      type: "image/png",
    });
    const { container } = render(<ImportFile fileChangeHandle={fileChange} />);
    const input = container.querySelector("input");
    input && userEvent.upload(input, file);
    expect(input?.files).toHaveLength(1);
  });

  it("File from state is setting", () => {
    const file = new File(["100100100"], "exampleoffile.png", {
      type: "image/png",
    });
    const { container } = render(<ImportFile fileChangeHandle={fileChange} />);
    const input = container.querySelector("input");
    input && userEvent.upload(input, file);
    expect(input?.files[0].name).toBe("exampleoffile.png");
  });

  it("Component should has 2 labels", () => {
    const { container } = render(<ImportFile fileChangeHandle={fileChange} />);
    const labels = container.querySelectorAll("label");
    expect(labels).toHaveLength(2);
  });
});
