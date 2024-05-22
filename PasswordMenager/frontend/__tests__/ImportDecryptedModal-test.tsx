import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ImportDecrypted from "../src/components/ImportModals/ImportDecrypted/index";
import userEvent from "@testing-library/user-event";
import { Import } from "../src/utils/import.utils";
import { Provider } from "mobx-react";
import { getStore } from "./utils/store.utils";

//jest.mock('../src/utils/import.utils')

let checkenImport = jest
  .spyOn(Import.prototype, "ImportFile")
  .mockImplementation(() => Promise.resolve(true));
const closeMockHandle = jest.fn();
const getContainer = (): HTMLElement => {
  const { container } = render(
    <Provider store={getStore()}>
      <ImportDecrypted modalOpen={true} closeModalHandle={closeMockHandle} />
    </Provider>
  );

  return container;
};

afterEach(cleanup);
describe("ImportDecryptedModal test", () => {
  it("It should render", () => {
    const container = getContainer();
    expect(screen).toBeTruthy();
  });

  it("Should has acceptmodal component", async () => {
    const contsiner = getContainer();
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("When file change", () => {
    const file = new File(["100100100"], "exampleoffile.png", {
      type: "image/png",
    });
    const container = getContainer();
    const input = container.querySelector("input");
    input &&
      fireEvent.change(input, {
        target: {
          files: [file],
        },
      });
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[1]);
    expect(checkenImport).toBeCalled();
  });

  it("Cancel button on modal should fire close handle function", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[0]);
    expect(closeMockHandle).toBeCalled();
  });
});
