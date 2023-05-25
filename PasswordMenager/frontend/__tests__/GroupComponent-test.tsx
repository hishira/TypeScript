import { cleanup, render } from "@testing-library/react";
import GroupComponent from "../src/components/GroupComponent";
import { Group } from "../src/utils/group.utils";
import { GetGroupsMock } from "./utils/Group.mock";

const groupSpy = jest
  .spyOn(Group.prototype, "GetGroupsByUser")
  .mockImplementation(() =>
    Promise.resolve({ status: true, response: GetGroupsMock(5) })
  );
const selectGroupHandleMock = jest.fn(() => {});
const getContainer = (): HTMLElement => {
  const { container } = render(
    <GroupComponent selectgrouphandle={selectGroupHandleMock} />
  );

  return container;
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());
// TODO: End this test
describe("GroupComponent tests", () => {
  it("Component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("Should has button Add Group", () => {
    const button = getContainer().querySelector("button");
    expect(button?.textContent).toBe("Add new group");
  });
  it("In component should run GroupEffect", () => {
    const container = getContainer();
    expect(groupSpy).toBeCalledTimes(1);
  });

  it("Should has 5 group element", () => {
    const elements = getContainer().querySelectorAll("div[key]");
    expect(elements).toHaveLength(5);
  });
});
