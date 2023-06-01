import { cleanup, render } from "@testing-library/react";
import { Auth } from "../src/utils/auth.utils";
import { generateMockAuthTokens } from "./utils/auth.utils";
import { Provider } from "mobx-react";
import LoginPage from "../src/pages/Login";
import { getPrivateRouteStore } from "./utils/store.utils";
const LoginHandleSpyMock = jest
  .spyOn(Auth.prototype, "LoginUserHandle")
  .mockImplementation((loginInfo) =>
    Promise.resolve({ status: true, response: generateMockAuthTokens() })
  );

const getContainer = (): HTMLElement => {
  const { container } = render(
    <Provider store={getPrivateRouteStore(false)}>
      <LoginPage />
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
});
