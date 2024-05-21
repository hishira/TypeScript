import { cleanup, getByRole, render, waitFor } from "@testing-library/react";
import { Provider } from "mobx-react";
import FieldsContainer from "../src/components/FieldsComponent";
import { GetEntryMock } from "./utils/Entry.mock";
import { getStore } from "./utils/store.utils";

//quick fix
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(true) })
);
const refreshGroupMockFunction = jest.fn(() => {});
const getContainer = () => {
  const { container } = render(
    <Provider store={getStore()}>
      <FieldsContainer
        passwords={[GetEntryMock()]}
        selectedgroup="1-2-3-23-2"
        refreshgroupentities={refreshGroupMockFunction}
        refreshall={true}
      />
    </Provider>
  );

  return container;
};
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("FieldsContainer component", () => {
  it("Container should be defined", () => {
    expect(getContainer()).toBeDefined();
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
      expect(trElements).toHaveLength(2);
    });
  });
  it("Delete icon shouod be defined", async () => {
    const container = getContainer();

    await waitFor(() => {
      const deleteIcon = getByRole(container, "delete");
      expect(deleteIcon).toBeDefined();
    });
  });

  it("Should has edit button", async () => {
    const container = getContainer();
    await waitFor(() => {
      const editIcon = getByRole(container, "edit");
      expect(editIcon).toBeDefined();
    });
  });

  //TODO: Can add more tests
});
