import { cleanup, render } from "@testing-library/react";
import FieldsContainer from "../src/components/FieldsComponent";
import { Entry } from "../src/utils/entry.utils";
import { GetEntriesMock } from "./utils/Entry.mock";

const jestMockSpu = jest
  .spyOn(Entry.prototype, "GetUserEntriesByGroupID")
  .mockImplementation((groupId) =>
    Promise.resolve({ status: true, response: GetEntriesMock() })
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
  
});
