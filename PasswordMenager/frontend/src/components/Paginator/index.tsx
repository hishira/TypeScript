import { PaginatorContainer } from "./component.styled";

type PaginatorComponentProps = {
  pageInfo: {
    hasMore: boolean;
    items: number;
    page: number;
  };
};
export const Paginator = ({
  pageInfo,
}: PaginatorComponentProps): JSX.Element => {
  return <PaginatorContainer>{pageInfo?.page}</PaginatorContainer>;
};
