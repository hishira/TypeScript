import { render } from "@testing-library/react";
import GroupComponent from "../src/components/GroupComponent";
import { Group } from "../src/utils/group.utils";

const groupSpy = jest
  .spyOn(Group.prototype, "GetGroupsByUser")
  .mockImplementation(() => Promise.resolve({ status: true, response: [] }));
const selectGroupHandleMock = jest.fn(() => {});
const getContainer = (): HTMLElement => {
  const { container } = render(
    <GroupComponent selectgrouphandle={selectGroupHandleMock} />
  );

  return container;
};

describe("GroupComponent tests", () => {
  it("Component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });
});
