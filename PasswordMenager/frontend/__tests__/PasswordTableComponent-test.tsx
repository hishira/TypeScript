import { cleanup, render } from "@testing-library/react";
import { PasswordTableComponent } from "../src/components/PasswordTable";
import { GetEntriesMock } from "./utils/Entry.mock";

const deleteHandleMockFunction = jest.fn(() => {});
const oneEditHandleMockFunction = jest.fn(() => {});
const moreClickHandleMockFunction = jest.fn(() => {});
const getContainer = (numberOfEntries: number = 10): HTMLElement => {
  const { container } = render(
    <PasswordTableComponent
      entries={GetEntriesMock(numberOfEntries)}
      deletehandle={deleteHandleMockFunction}
      onedithandle={oneEditHandleMockFunction}
      moreClickHandle={moreClickHandleMockFunction}
    />
  );

  return container;
};
afterEach(cleanup);
afterEach(() => jest.clearAllMocks());

describe('PasswordTableComponent component',()=>{
    it('Component should be defined', ()=>{
        expect(getContainer()).toBeDefined();
    })

    it('Should has table component', ()=>{
        const table = getContainer().querySelector('table')

        expect(table).toBeDefined();
    })

    it('Should has table head', ()=>{
        const thead = getContainer().querySelector('thead');

        expect(thead).toBeDefined();
    })

    it('Should has 5 tablehead element', ()=>{
        const theads = getContainer().querySelectorAll('th');

        expect(theads).toHaveLength(5);
    })

    it('Should has 11 tr elements', ()=>{
        const tr = getContainer().querySelectorAll('tr');

        expect(tr).toHaveLength(11);
    })
})
