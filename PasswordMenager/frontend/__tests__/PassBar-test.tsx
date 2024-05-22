import { cleanup, fireEvent, render } from "@testing-library/react";
import PassBar from "../src/components/PassBarr";
import { Export } from "../src/utils/export.utils";
import { getStore } from "./utils/store.utils";
import { Provider } from "mobx-react";

const ExportExportEncryptedCSVSpy = jest
  .spyOn(Export.prototype, "ExportEntriesCsv")
  .mockImplementation(() => Promise.resolve());

const ExportEncrypted = jest
  .spyOn(Export.prototype, "ExportEncrypted")
  .mockImplementation(() => Promise.resolve(true));

const getContainer = (): HTMLElement => {
  const { container } = render(
    <Provider store={getStore()}>
      <PassBar />
    </Provider>
  );

  return container;
};

const getByRole = () => {
  const { getByRole } = render(
    <Provider store={getStore()}>
      <PassBar />
    </Provider>
  );

  return getByRole;
};
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

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

  it("Edit entry should open modal", () => {
    const container = getContainer();
    const getbyrole = getByRole();
    const button = container.querySelectorAll("button")[0];
    fireEvent.click(button);
    expect(getbyrole("dialog")).toBeDefined();
  });

  it("Export entries should trigger Export ExportEntriesCsv function", async () => {
    const container = getContainer();
    const button = container.querySelectorAll("button")[1];
    fireEvent.click(button);
    await Promise.resolve();

    expect(ExportExportEncryptedCSVSpy).toBeCalledTimes(1);
  });

  it("Export entries should trigger Export ExportEncrypted function", async () => {
    const container = getContainer();
    const button = container.querySelectorAll("button")[2];
    fireEvent.click(button);
    await Promise.resolve();

    expect(ExportEncrypted).toBeCalledTimes(1);
  });

  it("Import encrypted should open modal", async () => {
    const container = getContainer();
    const getbyrole = getByRole();
    const button = container.querySelectorAll("button")[3];
    fireEvent.click(button);
    await Promise.resolve().catch();

    expect(getbyrole("dialog")).toBeDefined();
  });

  it("Import encrypted modal should has input", async () => {
    const container = getContainer();
    const button = container.querySelectorAll("button")[3];
    fireEvent.click(button);
    await Promise.resolve().catch();
    const buttons = container.querySelectorAll("button");
    let includeModalButtons = false;
    buttons.forEach((button) => {
      if (button.textContent === "Accept" || button.textContent === "Cancel")
        includeModalButtons = true;
    });
    expect(includeModalButtons).toBe(true);
  });
});
