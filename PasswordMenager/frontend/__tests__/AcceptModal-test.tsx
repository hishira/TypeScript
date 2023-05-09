import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { AcceptModalComponent } from "../src/components/Modal/AcceptModal";
let modalVisible = true;
const modalCloseHandle = () => (modalVisible = false);

const acceptmodalHandle = jest.fn().mockReturnValue(true);
const getContainer = (): HTMLElement => {
  const { container } = render(
    <AcceptModalComponent
      visible={modalVisible}
      onClose={modalCloseHandle}
      component={<div className="name" />}
      acceptHandle={acceptmodalHandle}
    />
  );
  return container;
};

const getNotVisibleContainer = (): HTMLElement => {
  const { container } = render(
    <AcceptModalComponent
      visible={false}
      onClose={modalCloseHandle}
      component={<div className="name" />}
      acceptHandle={() => {}}
    />
  );
  return container;
};

afterEach(cleanup);
describe("AcceptModalComponent", () => {
  it("should render", () => {
    const container = getContainer();
    expect(screen).toBeTruthy();
  });
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
    const { container, rerender } = render(
      <AcceptModalComponent
        visible={modalVisible}
        onClose={modalCloseHandle}
        component={<div className="name" />}
        acceptHandle={() => {}}
      />
    );
    const element = container.querySelector("div");
    const buttons = container.querySelectorAll("button");
    fireEvent(
      buttons[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    rerender(
      <AcceptModalComponent
        visible={false}
        onClose={modalCloseHandle}
        component={<div className="name" />}
        acceptHandle={() => {}}
      />
    );
    expect(element).toHaveStyle("display: none");
  });

  it("Component should not be visible when pass as props false", () => {
    const container = getNotVisibleContainer();
    const element = container.querySelector("div");
    expect(element).toHaveStyle("display: none");
  });

  it("Should has proper component as props", () => {
    const container = getContainer();
    const inElement = container.querySelector(".name");
    expect(inElement).toBeTruthy();
  });

  it("should fire proper function", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    fireEvent(
      buttons[1],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(acceptmodalHandle).toBeCalled();
  });
});
