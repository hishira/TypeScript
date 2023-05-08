import { cleanup, render } from "@testing-library/react";
import { ImportDecrypted } from "../src/components/ImportModals/ImportDecrypted/index";

// TODO: Fix import 
const getContainer = (): HTMLElement => {
  const { container } = render(
    <ImportDecrypted modalOpen={true} closeModalHandle={() => {}} />
  );

  return container;
};

afterEach(cleanup);

describe("ImportDecryptedModal test", () => {
  it("It should render", () => {
    const container = getContainer();
    const element = container.querySelector('div');
    expect(element).toBeTruthy();
  });
});
