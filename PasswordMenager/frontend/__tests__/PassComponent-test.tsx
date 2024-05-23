import { cleanup, render } from "@testing-library/react";
import { Provider } from "mobx-react";
import PassComponent from "../src/components/PassComponent";
import { Entry } from "../src/utils/entry.utils";
import { Group } from "../src/utils/group.utils";
import { GetEntriesMock, GetEntryMock } from "./utils/Entry.mock";
import { GetGroupsMock } from "./utils/Group.mock";
import { getButtonWithSpecificText } from "./utils/button.utils";
import { getStore } from "./utils/store.utils";

const groupSpy = jest
  .spyOn(Group.prototype, "GetGroupsByUser")
  .mockImplementation(() =>
    Promise.resolve({ status: true, response: GetGroupsMock(5) })
  );

const entrySpu = jest
  .spyOn(Entry.prototype, "GetEntriesBy")
  .mockImplementation(() =>
    Promise.resolve({
      pageInfo: { page: 0, hasMore: false, items: 5 },
      data: GetEntriesMock(5),
    })
  );

const getContainer = (): HTMLElement => {
  const { container } = render(
    <Provider store={getStore()}>
      <PassComponent />
    </Provider>
  );

  return container;
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());
// TODO: More tests
describe("PassComponent", () => {
  it("Component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("On start should triger group fetch", () => {
    getContainer();
    expect(groupSpy).toBeCalledTimes(1);
  });

  it("Should has button Add new group", () => {
    const buttons = getContainer().querySelectorAll('[role=plus]')
    expect(buttons).toBeDefined();
  });
});
