import { cleanup, fireEvent, render } from "@testing-library/react";
import GroupComponent from "../src/components/GroupComponent";
import { Group } from "../src/utils/group.utils";
import { GetGroupsMock } from "./utils/Group.mock";
import { getButtonWithSpecificText } from "./utils/button.utils";

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

  it("Should has button Add new Group", () => {
    const buttons = getContainer().querySelectorAll("button");
    const button = getButtonWithSpecificText(buttons, "Add new group");
    expect(button).toBeDefined();
  });

  it("After click Add new Group modal should open", () => {
    const buttons = getContainer().querySelectorAll("button");
    const button = getButtonWithSpecificText(buttons, "Add new group");
    button && fireEvent.click(button);

    expect(getContainer().querySelector("[role='modal']")).toBeDefined();
  });
});
