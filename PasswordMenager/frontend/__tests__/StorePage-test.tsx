import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import StorePage from "../src/pages/Store";
import { Group } from "../src/utils/group.utils";
import { GROUPNAME, GetGroupMock, GetGroupsMock } from "./utils/Group.mock";
import { Entry } from "../src/utils/entry.utils";
import { GetEntriesMock, GetEntryMock } from "./utils/Entry.mock";
import { Provider } from "mobx-react";
import { getStore } from "./utils/store.utils";

const groupSpy = jest
  .spyOn(Group.prototype, "GetGroupsByUser")
  .mockImplementation(() =>
    Promise.resolve({ status: true, response: GetGroupsMock(5) })
  );
const createGroup = jest
  .spyOn(Group.prototype, "CreateGroupForUser")
  .mockImplementation(() =>
    Promise.resolve({ status: true, response: GetGroupMock() })
  );

const getEntriesMockSpy = jest
  .spyOn(Entry.prototype, "GetEntriesBy")
  .mockImplementation(({ groupId, paginator, title }) =>
    Promise.resolve({
      pageInfo: { hasMore: false, items: 2, page: 0 },
      data: GetEntriesMock(),
    })
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

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());
const getContainer = (): HTMLElement => {
  const { container } = render(
    <Provider store={getStore()}>
      <StorePage />
    </Provider>
  );

  return container;
};

describe("StorePage test", () => {
  it("Component should be defined", async () => {
    await waitFor(async () => expect(getContainer()).toBeDefined());
  });

  it("On load should trigger groupSpy", async () => {
    await waitFor(async () => {
      getContainer();
      expect(groupSpy).toBeCalledTimes(1);
    });
  });

  it("It should has 5 element with group key", async () => {
    const container = getContainer();
    await waitFor(async () => {
      const divElement = container.querySelectorAll("div");
      const groupElement = Array.from(divElement).filter(
        (element) => element.textContent === GROUPNAME
      );
      expect(groupElement).toHaveLength(10);
    });
  });

  it("Clicking in group should trigger fetching entries", async () => {
    const container = getContainer();
    await waitFor(async () => {
      const divElement = container.querySelectorAll("div");
      const groupElement = Array.from(divElement).filter(
        (element) => element.textContent === GROUPNAME
      );
      fireEvent.click(groupElement[0]);
      await Promise.resolve();
      expect(getEntriesMockSpy).toBeCalledTimes(1);
    });
  });

  it("Before clicking group should has 1 tr elements only header", async () => {
    const container = getContainer();
    await waitFor(async () => {
      expect(container.querySelectorAll("tr")).toHaveLength(3);
    });
  });

  it("After click on group, should has entries", async () => {
    const container = getContainer();
    await waitFor(async () => {
      const divElement = container.querySelectorAll("div");
      const groupElement = Array.from(divElement).filter(
        (element) => element.textContent === GROUPNAME
      );
      fireEvent.click(groupElement[0]);
      await Promise.resolve();
      expect(container.querySelectorAll("tr")).toHaveLength(3);
    });
  });
});
