import { render } from "@testing-library/react";
import { Provider } from "mobx-react";
import AppBar from "../src/components/AppBar";
import { IGeneral } from "../src/models/General";
import { General } from "../src/models/General";
import { I18nextProvider } from "react-i18next";
import { initializeFunction } from "../src/i18n";
import i18nObject from "../src/i18n";
// Mocking global Response with the MockResponse class
const getContainer = (store: IGeneral = getStore()): HTMLElement => {
  initializeFunction();
  const { container } = render(
    <Provider store={store}>
        <AppBar />
    </Provider>
  );
  return container;
};

const getStore = () =>
  General.create({
    useractive: true,
    viewType: "Table",
    popUpelement: {
      open: false,
      type: "error",
      message: "",
    },
    isLocal: false,
    refetchAfterEntryCreate: true,
  });

describe("AppBar component test", () => {
  it("Container should be defined", () => {
    const container = getContainer();

    expect(container).toBeDefined();
  });

  it("Should has button", () => {
    const container = getContainer();
    const buttons = container.querySelector("button");
    expect(buttons).toBeDefined();
  });
  it("Without login user Appbar should only has login button", () => {
    const container = getContainer();
    const buttons = container.querySelector("button");
    expect(buttons).toBeDefined();
    expect(buttons?.textContent).toBe("");
  });

  it("When user is login it should be 5 buttons", () => {
    const store = getStore();
    const container = getContainer(store);

    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(5);
  });

  it("When user is active, logout button should be visible", () => {
    const store = getStore();
    const container = getContainer(store);
    const buttons = container.querySelectorAll("button");

    expect(buttons[4]).toHaveTextContent("Logout");
  });
});
