import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ImportDecrypted } from "../src/components/ImportModals/ImportDecrypted/index";
import userEvent from "@testing-library/user-event";
import { Import } from "../src/utils/import.utils";
//
//let checkenImport = jest
//  .spyOn(Import.prototype, "ImportFile")
//  .mockImplementation(() => Promise.resolve(true));
// TODO: Fix import
const getContainer = (): HTMLElement => {
  const { container } = render(
    <ImportDecrypted modalOpen={true} closeModalHandle={() => {}} />
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

  it("When file change", (done) => {
    const file = new File(["100100100"], "exampleoffile.png", {
      type: "image/png",
    });
    render(
      <ImportDecrypted modalOpen={true} closeModalHandle={() => {}} />
    );
    // TOOD: Jest has problem with spying on class :|
    const input = screen.getByRole("fileinput");
    let checkenImport = jest
      .spyOn(Import, "getInstance")
    console.log(input);
      input &&
      fireEvent.change(input, {
        target: {
          files: [file],
        },
      });
    expect(checkenImport).toBeCalled();
  });
});
