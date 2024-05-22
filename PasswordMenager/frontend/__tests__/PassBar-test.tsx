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

  it("Should has 1 buttons", () => {
    const container = getContainer();
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(1);
  });
  it("Should has svg export icon", () => {
    const exportIcon = getByRole()("export");
    expect(exportIcon).toBeDefined();
  });
  it("export should be svg", () => {
    const exportIcon = getByRole()("export");
    expect(exportIcon).toBeInstanceOf(SVGSVGElement);
  });
  it("Should has svg import icon", () => {
    const exportIcon = getByRole()("import");
    expect(exportIcon).toBeDefined();
  });
  it("import should be svg", () => {
    const exportIcon = getByRole()("import");
    expect(exportIcon).toBeInstanceOf(SVGSVGElement);
  });

  //TODO: Consider adding tests for opening modals

 
});
