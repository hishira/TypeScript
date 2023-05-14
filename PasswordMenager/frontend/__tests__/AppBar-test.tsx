import { render } from "@testing-library/react";
import { Provider } from "mobx-react";
import AppBar from "../src/components/AppBar";
import { IGeneral } from "../src/models/General";

const getContainer = (store?: IGeneral): HTMLElement => {
  const { container } = render(
    <Provider store={store}>
      <AppBar />
    </Provider>
  );
  return container;
};

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
    expect(buttons?.textContent).toBe("Login");
  });
});
