import { PaginatorContainer } from "./component.styled";
// Move type to shared
export type PaginatorType = {
  hasMore: boolean;
  items: number;
  page: number;
};

export type EntryPaginator = {
  page: number;
};
type PaginatorComponentProps = {
  pageInfo?: PaginatorType | null;
  paginationChange: (pageInfo: EntryPaginator) => void;
};
export const Paginator = ({
  pageInfo,
  paginationChange,
}: PaginatorComponentProps): JSX.Element => {
  const nextPage = (): void => {
    paginationChange({
      page: (pageInfo?.page ?? 0) + 1,
    });
  };
  const previousPage = (): void => {
    paginationChange({
      page: (pageInfo?.page ?? 1) - 1,
    });
  };
  return pageInfo ? (
    <PaginatorContainer>
      {pageInfo.page > 0 ? (
        <button onClick={() => previousPage()}>left</button>
      ) : null}
      <button onClick={previousPage}>{pageInfo.page > 0 ? "<" : null}</button>
      <span>{pageInfo?.page + 1}</span>{" "}
      {pageInfo.hasMore ? (
        <button onClick={() => nextPage()}>right</button>
      ) : null}
    </PaginatorContainer>
  ) : (
    <></>
  );
};
