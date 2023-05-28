import { cleanup, render } from "@testing-library/react";
import { Provider } from "mobx-react";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "../src/components/PrivateRoute";
import { IGeneral } from "../src/models/General";
import { getPrivateRouteStore } from "./utils/store.utils";

const getContainer = (store?: IGeneral): HTMLElement => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <PrivateRoute Component={<div className="test-class" />} path="none" />
      </MemoryRouter>
    </Provider>
  );

  return container;
};

afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe("PrivateComponent test", () => {
  it("Should be defined", () => {
    expect(getContainer(getPrivateRouteStore(true))).toBeDefined();
  });

  it("If not user login should redirect to login component", () => {
    const container = getContainer(getPrivateRouteStore(false));
    expect(container.querySelector("form")).toBeDefined(); // Login form
  });

  it("If user is login, should not redirect to login page", () => {
    const container = getContainer(getPrivateRouteStore(true));
    expect(container.querySelector("form")).toBe(null);
  });

  it('With user login should render proper component', ()=>{
    const container = getContainer();
    expect(container.querySelector('.test-class')).toBeDefined();
  })
});
