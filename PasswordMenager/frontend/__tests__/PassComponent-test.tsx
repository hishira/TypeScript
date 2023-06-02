import { cleanup, render } from "@testing-library/react";
import PassComponent from "../src/components/PassComponent";
import { Group } from "../src/utils/group.utils";
import { GetGroupsMock } from "./utils/Group.mock";
import { Entry } from "../src/utils/entry.utils";
import { GetEntriesMock } from "./utils/Entry.mock";
import { getButtonWithSpecificText } from "./utils/button.utils";

const groupSpy = jest
  .spyOn(Group.prototype, "GetGroupsByUser")
  .mockImplementation(() =>
    Promise.resolve({ status: true, response: GetGroupsMock(5) })
  );

const jestMockSpy = jest
  .spyOn(Entry.prototype, "GetUserEntriesByGroupID")
  .mockImplementation((groupId) =>
    Promise.resolve({ status: true, response: GetEntriesMock() })
  );
const getContainer = (): HTMLElement => {
  const { container } = render(<PassComponent />);

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

  it("Should trigger GetUserEntriesByGroupID", () => {
    getContainer();
    expect(jestMockSpy).toBeCalledTimes(0);
  });

  it('Should has button Add new group', ()=>{
    const buttons = getContainer().querySelectorAll('button');
    const buttonGroup = getButtonWithSpecificText(buttons, 'Add new group');
    expect(buttonGroup).toBeDefined();
  })
});
