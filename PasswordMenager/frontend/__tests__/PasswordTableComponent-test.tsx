import { cleanup, fireEvent, render } from "@testing-library/react";
import { PasswordTableComponent } from "../src/components/PasswordTable";
import { GetEntriesMock } from "./utils/Entry.mock";
import { getButtonWithSpecificText } from "./utils/button.utils";

const deleteHandleMockFunction = jest.fn(() => {});
const oneEditHandleMockFunction = jest.fn(() => {});
const moreClickHandleMockFunction = jest.fn(() => {});
const getContainer = (numberOfEntries: number = 10): HTMLElement => {
  const { container } = render(
    <PasswordTableComponent
      entries={GetEntriesMock(numberOfEntries)}
      deletehandle={deleteHandleMockFunction}
      onedithandle={oneEditHandleMockFunction}
      moreClickHandle={moreClickHandleMockFunction}
    />
  );

  return container;
};
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("PasswordTableComponent component", () => {
  it("Component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("Should has table component", () => {
    const table = getContainer().querySelector("table");

    expect(table).toBeDefined();
  });

  it("Should has table head", () => {
    const thead = getContainer().querySelector("thead");

    expect(thead).toBeDefined();
  });

  it("Should has 5 tablehead element", () => {
    const theads = getContainer().querySelectorAll("th");

    expect(theads).toHaveLength(5);
  });

  it("Should has 11 tr elements", () => {
    const tr = getContainer().querySelectorAll("tr");

    expect(tr).toHaveLength(11);
  });

  it("Should have 15 tr elements ", () => {
    const tr = getContainer(14).querySelectorAll("tr");

    expect(tr).toHaveLength(15);
  });

  it("Delete button should be defined", () => {
    const buttons = getContainer().querySelectorAll("[role=delete]");
    expect(buttons).toBeDefined();
  });

  it("Edit button should be defined", () => {
    const buttons = getContainer().querySelectorAll("[role=edit]");
    expect(buttons).toBeDefined();
  });

  it("More button should be defined", () => {
    const buttons = getContainer().querySelectorAll("button");
    const moreButton = getButtonWithSpecificText(buttons, "entries.table.button.more");
    expect(moreButton).toBeDefined();
  });

  it("Delete click should trigger", () => {
    const buttons = getContainer().querySelectorAll("[role=delete]");
    const deleteButton = Array.from(buttons).find(Boolean);
    deleteButton && fireEvent.click(deleteButton);
    expect(deleteHandleMockFunction).toBeCalledTimes(1);
  });

  it("Edit click should trigger", () => {
    const buttons = getContainer().querySelectorAll("[role=edit]");
    const editButton =  Array.from(buttons).find(Boolean);
    editButton && fireEvent.click(editButton);
    expect(oneEditHandleMockFunction).toBeCalledTimes(1);
  });

  it("More click should trigger", () => {
    const buttons = getContainer().querySelectorAll("button");
    const moreButton = getButtonWithSpecificText(buttons, "entries.table.button.more");
    moreButton && fireEvent.click(moreButton);
    expect(moreClickHandleMockFunction).toBeCalledTimes(1);
  });
});
