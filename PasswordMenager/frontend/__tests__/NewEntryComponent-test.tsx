import { cleanup, render, waitFor } from "@testing-library/react";
import NewEntryComponent from "../src/components/NewEntryComponent";
import { randomUUID } from "./utils/uuid.utils";
import { GetGroupsMock } from "./utils/Group.mock";
import { Group } from "../src/utils/group.utils";
import { Entry } from "../src/utils/entry.utils";
import { GetEntryMock } from "./utils/Entry.mock";

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
const getContainer = (isEdit: boolean = true): HTMLElement => {
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
});
