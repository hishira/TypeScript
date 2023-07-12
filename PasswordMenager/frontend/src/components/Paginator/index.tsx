import { PaginatorContainer } from "./component.styled";

type PaginatorComponentProps = {
  pageInfo?: {
    hasMore: boolean;
    items: number;
    page: number;
  } | null;
};
export const Paginator = ({
  pageInfo,
}: PaginatorComponentProps): JSX.Element => {
  return pageInfo ? (
    <PaginatorContainer>
      <span>{pageInfo.page > 0 ? "<" : null}</span>
      <span>{pageInfo?.page + 1}</span>{" "}
      <span>{pageInfo.hasMore ? ">" : null}</span>
    </PaginatorContainer>
  ) : (
    <></>
  );
};
