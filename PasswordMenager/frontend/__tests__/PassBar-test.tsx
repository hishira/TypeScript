import { cleanup, render } from "@testing-library/react";
import PassBar from "../src/components/PassBarr";

const getContainer = (): HTMLElement => {
  const { container } = render(<PassBar />);

  return container;
};
afterEach(cleanup);

describe("PassBar component", () => {
  it("Component should be defined", () => {
    expect(getContainer()).toBeDefined();
  });

  it("Should has main div container", () => {
    const container = getContainer();
    expect(container.querySelector("div")).toBeDefined();
  });

  it("Should has 4 buttons", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(4);
  });

  it("First button should contain text", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    expect(buttons[0].textContent).toBe("New entry");
  });
  it("Second button should contain text", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    expect(buttons[1].textContent).toBe("Export entries");
  });
  it("Third button should contain text", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    expect(buttons[2].textContent).toBe("Export encrypted");
  });
  it("Four button should contain text", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    expect(buttons[3].textContent).toBe("Import encrypted");
  });
});
