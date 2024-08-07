type DeleteEntryResponse<T> = {
  status: boolean;
  response: T | null;
};

type EditEntryResponse<T> = {
  status: boolean;
  respond: T | null;
};

type GroupResponse<T, PaginatorLike> =
  | T[]
  | {
      data: T[];
      pageInfo: PaginatorLike;
    };

type UpdateEntryCheck = {
  noteUpdate: boolean;
  passwordUpdate: boolean | string;
  titleUpdate: boolean;
  userNameUpdate: boolean;
  stateUpdate: boolean;
};

type TokenObject = {
  access_token: string;
  refresh_token: string;
};

type AccesTokenObject = Pick<TokenObject, 'access_token'>;

type PaginatorPage = {
  page: number;
};
type IPaginator = PaginatorPage & {
  items: number;
  hasMore: boolean;
};

type PaginatorData<T> = {
  data: T[];
  pageInfo: IPaginator;
};
