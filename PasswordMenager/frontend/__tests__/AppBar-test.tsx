import { render } from "@testing-library/react";
import { Provider } from "mobx-react";
import AppBar from "../src/components/AppBar";
import { IGeneral } from "../src/models/General";
import { General } from "../src/models/General";

const getContainer = (store?: IGeneral): HTMLElement => {
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
    popUpelement: {
      open: false,
      type: "error",
      message: "",
    },
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
    expect(buttons?.textContent).toBe("Login");
  });

  it("When user is login it should be 5 buttons", () => {
    const store = getStore();
    const container = getContainer(store);

    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(5);
  });

  it('When user is active, logout button should be visible', ()=>{
    const store = getStore();
    const container = getContainer(store);
    const buttons = container.querySelectorAll('button');

    expect(buttons[4]).toHaveTextContent('Logout');
  })
});
