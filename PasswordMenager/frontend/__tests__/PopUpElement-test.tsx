import { render } from "@testing-library/react";
import { Provider } from "mobx-react";
import { IGeneral } from "../src/models/General";
import PopUpElement from "../src/components/Popup/index";
const getContainer = (store?: IGeneral): HTMLElement => {
  const { container } = render(
    <Provider store={store}>
      <PopUpElement />
    </Provider>
  );
  return container;
};

describe("PopUpElement component", () => {
  it("Container should be defined", () => {
    expect(getContainer()).toBeDefined();
  });
});
