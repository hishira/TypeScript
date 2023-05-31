import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import NewEntryComponent from "../src/components/NewEntryComponent";
import { randomUUID } from "./utils/uuid.utils";
import { GetGroupsMock } from "./utils/Group.mock";
import { Group } from "../src/utils/group.utils";
import { Entry } from "../src/utils/entry.utils";
import { GetEntryMock } from "./utils/Entry.mock";
import { checkElementMatchContent } from "./utils/element.utils";
import { getButtonWithSpecificText } from "./utils/button.utils";

const groupSpy = jest
  .spyOn(Group.prototype, "GetGroupsByUser")
  .mockImplementation(() =>
    Promise.resolve({ status: true, response: GetGroupsMock(5) })
  );

const entrySpy = jest
  .spyOn(Entry.prototype, "getEntryById")
  .mockImplementation(() => Promise.resolve(GetEntryMock()));

const createEntrySpyComponent = jest
  .spyOn(Entry.prototype, "CreateNewEntryUser")
  .mockImplementation(() =>
    Promise.resolve({ status: true, response: GetEntryMock() })
  );

const editEntrySpyComponent = jest
  .spyOn(Entry.prototype, "EntryEditById")
  .mockImplementation(() =>
    Promise.resolve({ status: true, respond: GetEntryMock() })
  );
const closeModalDispatchMockHandle = jest.fn(() => {});
const refreshMockFunction = jest.fn(() => {});
const getContainer = (isEdit: boolean = false): HTMLElement => {
  const { container } = render(
    <NewEntryComponent
      edit={isEdit}
      editentryid={randomUUID()}
      refreshentry={true}
      refresh={refreshMockFunction}
      closeModalDispatcherHandle={closeModalDispatchMockHandle}
    />
  );

  return container;
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("NewEntryComponent test", () => {
  it("Component should be defined", async () => {
    await waitFor(() => expect(getContainer()).toBeDefined());
  });

  it("Should has label", async () => {
    await waitFor(() =>
      expect(getContainer().querySelector("label")).toBeDefined()
    );
  });

  it("Should has input element", async () => {
    await waitFor(() =>
      expect(getContainer().querySelector("input")).toBeDefined()
    );
  });

  it("Should has 4 labels", async () => {
    await waitFor(() => {
      expect(getContainer().querySelectorAll("label")).toHaveLength(4);
    });
  });

  it("Labes should has proper text contens", async () => {
    await waitFor(() => {
      const labels = getContainer().querySelectorAll("label");
      checkElementMatchContent(
        labels ?? [],
        "Title",
        "Username",
        "Password",
        "Note"
      );
    });
  });

  it("When it is not edit form, it should has Add button", async () => {
    await waitFor(() => {
      const buttons = getContainer().querySelectorAll("button");
      const addButton = getButtonWithSpecificText(buttons, "Add");
      expect(addButton).toBeDefined();
    });
  });

  it("When it is edit form, it should has Update button", async () => {
    await waitFor(() => {
      const buttons = getContainer(true).querySelectorAll("button");
      const update = getButtonWithSpecificText(buttons, "Update");
      expect(update).toBeDefined();
    });
  });

  it("Component should trigger GetGroupsByUser", async () => {
    await waitFor(() => {
      getContainer();
      expect(groupSpy).toBeCalledTimes(1);
    });
  });

  it("Click add buttons should trigger CreateNewEntryUser", async () => {
    await waitFor(() => {
      const buttons = getContainer().querySelectorAll("button");
      const addButton = getButtonWithSpecificText(buttons, "Add");
      addButton && fireEvent.click(addButton);
      expect(createEntrySpyComponent).toBeCalledTimes(1);
    });
  });

  it("Not edit mode should not trigger getEntryById", async () => {
    await waitFor(() => {
      getContainer();
      expect(entrySpy).toBeCalledTimes(0);
    });
  });

  it("Edit mode should not trigger getEntryById", async () => {
    await waitFor(() => {
      getContainer(true);
      expect(entrySpy).toBeCalledTimes(1);
    });
  });

  it("Click update button should trigger EntryEditById", async () => {
    await waitFor(() => {
      const buttons = getContainer(true).querySelectorAll("button");
      const update = getButtonWithSpecificText(buttons, "Update");
      update && fireEvent.click(update);
      expect(editEntrySpyComponent).toBeCalledTimes(1);
    });
  });
});
