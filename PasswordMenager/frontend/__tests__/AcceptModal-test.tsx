import { cleanup, fireEvent, render } from "@testing-library/react";
import { AcceptModalComponent } from "../src/components/Modal/AcceptModal";
let modalVisible = true;
const modalCloseHandle = () => (modalVisible = false);
const getContainer = (): HTMLElement => {
  const { container } = render(
    <AcceptModalComponent
      visible={modalVisible}
      onClose={modalCloseHandle}
      component={<div />}
      acceptHandle={() => {}}
    />
  );
  return container;
};

afterEach(cleanup);
describe("AcceptModalComponent", () => {
  it("Element with class hook should be visible", () => {
    const container = getContainer();
    const element = container.querySelector(".hook");
    expect(element).toBeTruthy();
  });
  it("First element should be visible", () => {
    const container = getContainer();
    const element = container.querySelector("div");
    expect(element).toBeVisible();
  });
  it("Should has 2 button cancel and accept", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toBe("Cancel");
    expect(buttons[1].textContent).toBe(" Accept");
  });
  it("Cancel button should hide modal", () => {
    const container = getContainer();
    const element = container.querySelector("div");
    const buttons = container.querySelectorAll("button");
    fireEvent(
      buttons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(element).toHaveStyle("display: none");
  });
});
