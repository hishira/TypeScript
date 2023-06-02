import { Provider } from "mobx-react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../src/pages/SignUp";
import { getPrivateRouteStore } from "./utils/store.utils";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { checkElementMatchContent } from "./utils/element.utils";
import { Auth } from "../src/utils/auth.utils";

const getContainer = (): HTMLElement => {
  const { container } = render(
    <Provider store={getPrivateRouteStore(false)}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>
  );

  return container;
};

const RegisterHandleSpyMock = jest
  .spyOn(Auth.prototype, "registerUser")
  .mockImplementation(({ login, password }) => Promise.resolve(true));

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("SignUp component", () => {
  it("component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it('Should has title "Log in to account"', () => {
    const pElement = getContainer().querySelector("p");
    expect(pElement?.textContent).toBe("Create account");
  });

  it("Should has button", () => {
    const button = getContainer().querySelector("button");
    expect(button).toBeDefined();
  });

  it("Button should has text Login", () => {
    const button = getContainer().querySelector("button");
    expect(button?.textContent).toBe("Sign Up");
  });

  it("Should has password and login labels", () => {
    const labels = getContainer().querySelectorAll("label");
    checkElementMatchContent(labels, "Password", "Login");
  });

  it("Click signup with wrong password policy should not trigger RegisterHandleSpyMock", () => {
    const button = getContainer().querySelector("button");
    button && fireEvent.click(button);
    expect(RegisterHandleSpyMock).toBeCalledTimes(0);
  });

  it("Should has 2 element with password type input", () => {
    const passwordsInputs = getContainer().querySelectorAll(
      "input[type=password]"
    );
    expect(passwordsInputs).toHaveLength(2);
  });

  it("With to short password we cannot create account", () => {
    const container = getContainer();
    const passwordInputs = container.querySelectorAll("input[type=password]");
    Array.from(passwordInputs).forEach((passwordElement) =>
      fireEvent.change(passwordElement, { target: { value: "12345" } })
    );
    const button = container.querySelector("button");
    button && fireEvent.click(button);
    expect(RegisterHandleSpyMock).toBeCalledTimes(0);
  });

  it("With no equal password we cannot create account", () => {
    const container = getContainer();
    const passwordInputs = container.querySelectorAll("input[type=password]");
    Array.from(passwordInputs).forEach((passwordElement, index) =>
      fireEvent.change(passwordElement, { target: { value: `${index}1234123` } })
    );
    const button = container.querySelector("button");
    button && fireEvent.click(button);
    expect(RegisterHandleSpyMock).toBeCalledTimes(0);
  });

  it("With proper password we can create account", () => {
    const container = getContainer();
    const passwordInputs = container.querySelectorAll("input[type=password]");
    Array.from(passwordInputs).forEach((passwordElement, index) =>
      fireEvent.change(passwordElement, { target: { value: `123456` } })
    );
    const button = container.querySelector("button");
    button && fireEvent.click(button);
    expect(RegisterHandleSpyMock).toBeCalledTimes(1);
  });
});
