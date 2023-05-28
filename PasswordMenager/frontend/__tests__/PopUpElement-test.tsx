import { render } from "@testing-library/react";
import { Provider } from "mobx-react";
import { General, IGeneral } from "../src/models/General";
import PopUpElement from "../src/components/Popup/index";
import { POPUPMESSAGE, POPUPTYPE, getStoreForPopUp } from "./utils/store.utils";


const getContainer = (store?: IGeneral): HTMLElement => {
  const { container } = render(
    <Provider store={store}>
      <PopUpElement />
    </Provider>
  );
  return container;
};

// TODO: MORE ? 
describe("PopUpElement component", () => {
  it("Container should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("Should container proper type message", () => {
    const container = getContainer(getStoreForPopUp());
    const elements = container.querySelectorAll("div");
    expect(elements[1].textContent).toBe(POPUPTYPE.toUpperCase());
  });

  it("Should container proper message", () => {
    const container = getContainer(getStoreForPopUp());
    const elements = container.querySelectorAll("div");
    expect(elements[2].textContent).toBe(POPUPMESSAGE);
  });
});
