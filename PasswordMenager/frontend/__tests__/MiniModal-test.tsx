import { cleanup, fireEvent, render } from "@testing-library/react";
import { ModalButtonChoicer } from "../src/components/MiniModal";
import { GetEntryMock } from "./utils/Entry.mock";
import { Entry } from "../src/utils/entry.utils";

const RefreshGroupEnttities = jest.fn();
const SetEntryToEdit = jest.fn();
const SetEditmodalOpen = jest.fn();
const ModalClose = jest.fn();
const DeleteEntrySpy = jest
  .spyOn(Entry.prototype, "DeleteUserEntry")
  .mockImplementationOnce((id) =>
    Promise.resolve({ respond: GetEntryMock(), status: true })
  )
  .mockImplementationOnce((id) =>
    Promise.resolve({ respond: GetEntryMock(), status: true })
  )
  .mockImplementationOnce((id) =>
    Promise.resolve({ respond: GetEntryMock(), status: true })
  )
  .mockImplementationOnce((id) =>
    Promise.resolve({ respond: GetEntryMock(), status: false })
  );
const getContainer = (): HTMLElement => {
  const { container } = render(
    <ModalButtonChoicer
      entry={GetEntryMock()}
      refreshgroupentities={RefreshGroupEnttities}
      setentrytoedit={SetEntryToEdit}
      seteditmodalopen={SetEditmodalOpen}
      modalClose={ModalClose}
    />
  );

  return container;
};
afterEach(cleanup);
describe("MiniModal component (ModalButtonChoicer)", () => {
  it("Component should exists", () => {
    expect(getContainer()).toBeDefined();
  });

  it("should has div element", () => {
    const container = getContainer();
    expect(container.querySelector("div")).toBeDefined();
  });
  it("should has 2 buttons", () => {
    const buttons = getContainer().querySelectorAll("button");
    expect(buttons).toHaveLength(2);
  });
  it("Buttons should be Delete and Edit", () => {
    const buttons = getContainer().querySelectorAll("button");
    expect(buttons[0].textContent).toBe("Delete");
    expect(buttons[1].textContent).toBe("Edit");
  });
  it("Main div should has id attribute", () => {
    const id = getContainer().querySelector("div")?.getAttribute("id");
    expect(id).toBeDefined();
    expect(id).toBe(GetEntryMock()._id);
  });

  it("Edit handle should use Entry.getInstance().deleteUserEntry()", () => {
    const deleteButton = getContainer().querySelectorAll("button")[0];
    fireEvent.click(deleteButton);
    expect(DeleteEntrySpy).toBeCalledTimes(1);
  });

  it("Edit handle RefreshGroupEnttities when status is true", () => {
    const deleteButton = getContainer().querySelectorAll("button")[0];
    fireEvent.click(deleteButton);
    expect(RefreshGroupEnttities).toBeCalled();
    RefreshGroupEnttities.mockClear()
  });

  it("Edit handle when status is true should close modal", () => {
    const deleteButton = getContainer().querySelectorAll("button")[0];
    fireEvent.click(deleteButton);
    expect(ModalClose).toBeCalled();
    ModalClose.mockClear()
  });
});
