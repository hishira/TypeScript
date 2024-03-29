import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import FieldsContainer from "../src/components/FieldsComponent";
import { Entry } from "../src/utils/entry.utils";
import { GetEntriesMock, GetEntryMock } from "./utils/Entry.mock";
import { getButtonWithSpecificText } from "./utils/button.utils";
import { checkElementMatchContent } from "./utils/element.utils";

const jestMockSpy = jest
  .spyOn(Entry.prototype, "GetUserEntriesByGroupID")
  .mockImplementation((groupId) =>
    Promise.resolve({ status: true, response: GetEntriesMock() })
  );

const jestDeleteMockSpy = jest
  .spyOn(Entry.prototype, "DeleteUserEntry")
  .mockImplementation((entryId) =>
    Promise.resolve({ status: true, respond: GetEntryMock() })
  );

//quick fix
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(true) })
);
const refreshGroupMockFunction = jest.fn(() => {});
const getContainer = () => {
  const { container } = render(
    <FieldsContainer
      selectedgroup="1-2-3-23-2"
      refreshgroupentities={refreshGroupMockFunction}
      refreshall={true}
    />
  );

  return container;
};
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("FieldsContainer component", () => {
  it("Container should be defined", () => {
    expect(getContainer()).toBeDefined();
  });
  it("GetUserEntriesByGroupID should be called", () => {
    const container = getContainer();
    expect(jestMockSpy).toBeCalledTimes(1);
  });

  it("On start should has no dialog", () => {
    const container = getContainer();
    const modal = container.querySelectorAll('[role="dialog"]');
    expect(modal).toHaveLength(0);
  });

  it("Should has 3 tr element", async () => {
    //const trElements = await waitFor(() =>
    const container = getContainer();
    await waitFor(() => {
      const trElements = container.querySelectorAll("tr");
      expect(trElements).toHaveLength(3);
    });
  });
  it("Delete button should trigger delete", async () => {
    const container = getContainer();

    await waitFor(() => {
      const buttons = container.querySelectorAll("button");
      const deleteButton = getButtonWithSpecificText(buttons, "Delete");
      deleteButton && fireEvent.click(deleteButton);
      expect(jestDeleteMockSpy).toBeCalledTimes(1);
    });
  });

  it("Delete button should trigger refreshGroupMockFunction", async () => {
    const container = getContainer();
    await waitFor(() => {
      const buttons = container.querySelectorAll("button");
      const deleteButton = getButtonWithSpecificText(buttons, "Delete");
      deleteButton && fireEvent.click(deleteButton);
      expect(refreshGroupMockFunction).toBeCalledTimes(1);
    });
  });

  it("Should has edit button", async () => {
    const container = getContainer();
    await waitFor(() => {
      const buttons = container.querySelectorAll("button");
      const editButton = getButtonWithSpecificText(buttons, "Edit");
      expect(editButton).toBeDefined();
    });
  });

  it("Edit button should open modal", async () => {
    const container = getContainer();
    await waitFor(() => {
      const editButton = getButtonWithSpecificText(
        container.querySelectorAll("button"),
        "Edit"
      );
      editButton && fireEvent.click(editButton);
      expect(container.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    });
  });

  it("Edit modal should has proper labels", async () => {
    const container = getContainer();
    await waitFor(() => {
      const editButton = getButtonWithSpecificText(
        container.querySelectorAll("button"),
        "Edit"
      );
      editButton && fireEvent.click(editButton);
      const modal = container.querySelector('[role="dialog"]');
      const modalLabels = modal?.querySelectorAll("label");
      checkElementMatchContent(
        modalLabels ?? [],
        "Title",
        "Username",
        "Password",
        "Note"
      );
    });
  });
});
