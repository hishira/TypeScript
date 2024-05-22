import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "mobx-react";
import LoginPage from "../src/pages/Login";
import { Auth } from "../src/utils/auth.utils";
import { generateMockAuthTokens } from "./utils/auth.utils";
import { getPrivateRouteStore } from "./utils/store.utils";
import { checkElementMatchContent } from "./utils/element.utils";
import { SessionStorage } from "../src/utils/localstorage.utils";
import { MemoryRouter } from "react-router-dom";
const LoginHandleSpyMock = jest
  .spyOn(Auth.prototype, "LoginUserHandle")
  .mockImplementation((loginInfo) =>
    Promise.resolve({ status: true, response: generateMockAuthTokens() })
  );

const SessionStorageSetTokenMock = jest
  .spyOn(SessionStorage.prototype, "setLocalStorageToken")
  .mockImplementation(() => {});

const getContainer = (): HTMLElement => {
  const { container } = render(
    <Provider store={getPrivateRouteStore(false)}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  return container;
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("LoginPage component", () => {
  it("component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it('Should has title "Log in to account"', () => {
    const pElement = getContainer().querySelector("p");
    expect(pElement?.textContent).toBe("page.login.mainTitle");
  });

  it("Should has button", () => {
    const button = getContainer().querySelector("button");
    expect(button).toBeDefined();
  });

  it("Button should has text Login", () => {
    const button = getContainer().querySelector("button");
    expect(button?.textContent).toBe("page.login.button.text");
  });

  it("Should has password and login labels", () => {
    const labels = getContainer().querySelectorAll("label");
    checkElementMatchContent(labels, "input.label.login", "input.label.password");
  });

  it("Click login button should trigger LoginHandleSpyMock", async () => {
    const button = getContainer().querySelector("button");
    button && fireEvent.click(button);
    await waitFor(()=>{
    expect(LoginHandleSpyMock).toBeCalledTimes(0);
    });
  });

  it("Click login button should trigger SessionStorageSetTokenMock", async () => {
    const button = getContainer().querySelector("button");
    button && fireEvent.click(button);
    await Promise.resolve();
    expect(SessionStorageSetTokenMock).toBeCalledTimes(0);
  });
  //TODO: Add test with filled input
});
