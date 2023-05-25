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

const jestMockSpy = jest
  .spyOn(Entry.prototype, "GetUserEntriesByGroupID")
  .mockImplementation((groupId) =>
    Promise.resolve({ status: true, response: GetEntriesMock() })
  );

const jestDeleteMockSpy = jest
  .spyOn(Entry.prototype, "DeleteUserEntry")
  .mockImplementationOnce((entryId) =>
    Promise.resolve({ status: true, respond: GetEntryMock() })
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

  it("Should has 3 tr element", async () => {
    const trElements = await waitFor(() =>
      getContainer().querySelectorAll("tr")
    );

    await waitFor(() => expect(trElements).toHaveLength(3));
  });
  it("Delete button should trigger delete", async () => {
    const buttons = getContainer().querySelectorAll("button");
    const deleteButton = getButtonWithSpecificText(buttons, "Delete");
    deleteButton && fireEvent.click(deleteButton);
    await waitFor(() => expect(jestDeleteMockSpy).toBeCalledTimes(1));
  });

  it("Delete button should trigger refreshGroupMockFunction", async () => {
    const buttons = getContainer().querySelectorAll("button");
    const deleteButton =  screen.queryByRole("button", {
      name: /delete/i,
    }); //getButtonWithSpecificText(buttons, "Delete");
    deleteButton && fireEvent.click(deleteButton);
    await waitFor(() => expect(refreshGroupMockFunction).toBeCalledTimes(1));
  });
});
