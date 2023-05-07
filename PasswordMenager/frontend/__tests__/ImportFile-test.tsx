import { cleanup, render } from "@testing-library/react";
import { ImportFile } from "../src/components/ImportFille/index";
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
});
