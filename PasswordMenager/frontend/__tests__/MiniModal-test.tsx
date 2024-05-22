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
//afterEach(cleanup);
afterEach(() => {
  ModalClose.mockClear();
  RefreshGroupEnttities.mockClear();
  SetEditmodalOpen.mockClear();
  SetEntryToEdit.mockClear();
  cleanup();
});
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
    expect(buttons[0].textContent).toBe("minimodal.button.delete");
    expect(buttons[1].textContent).toBe("minimodal.button.edit");
  });
  it("Main div should has id attribute", () => {
    const id = getContainer().querySelector("div")?.getAttribute("id");
    expect(id).toBeDefined();
    expect(id).toBe(GetEntryMock()._id);
  });

  it("Delete handle should use Entry.getInstance().deleteUserEntry()", () => {
    const deleteButton = getContainer().querySelectorAll("button")[0];
    fireEvent.click(deleteButton);
    expect(DeleteEntrySpy).toBeCalledTimes(1);
  });

  it("Delete handle RefreshGroupEnttities when status is true", async () => {
    const deleteButton = getContainer().querySelectorAll("button")[0];
    fireEvent(deleteButton, new MouseEvent("click", { bubbles: true }));
    await Promise.resolve();
    expect(RefreshGroupEnttities).toBeCalled();
  });

  it("Delete handle when status is true should close modal", async () => {
    const deleteButton = getContainer().querySelectorAll("button")[0];
    fireEvent(deleteButton, new MouseEvent("click", { bubbles: true }));
    await Promise.resolve();
    expect(ModalClose).toBeCalled();
  });

  it("When delete and get fale status modal should not close", async () => {
    const deleteButton = getContainer().querySelectorAll("button")[0];
    fireEvent.click(deleteButton);
    await Promise.resolve();

    expect(ModalClose).toBeCalledTimes(0);
  });

  it("When edit should run setentrytoedit", () => {
    const deleteButton = getContainer().querySelectorAll("button")[1];
    fireEvent.click(deleteButton);
    expect(SetEntryToEdit).toBeCalledTimes(1);
  });
  it("When edit should run seteditmodalopen", () => {
    const deleteButton = getContainer().querySelectorAll("button")[1];
    fireEvent.click(deleteButton);
    expect(SetEditmodalOpen).toBeCalledTimes(1);
  });
  it("When edit should run modalClose", () => {
    const deleteButton = getContainer().querySelectorAll("button")[1];
    fireEvent.click(deleteButton);
    expect(ModalClose).toBeCalledTimes(1);
  });
});
