type UserAuth = {
  login: string;
  password: string;
  email: string;
};

type RegisterUser = {
  login: string;
  password: string;
  email: string;
};

type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

type AccessToken = {
  access_token: string;
};
type LoginReponse = {
  status: boolean;
  response: AuthTokens & { message?: string };
};

type IGroup = {
  _id: string;
  name: string;
  userid: string;
};

type GroupResponse = {
  status: boolean;
  response: Array<IGroup>;
};

type CreateGroup = {
  name: string;
};

type CreateGroupResponse = {
  status: boolean;
  response: IGroup;
};

type CreateEntryDto = {
  title: string;
  username: string;
  password: string;
  note: string;
  groupid: string;
  url: string;
  passwordExpiredDate?: string;
};

interface IEntry extends CreateEntryDto {
  _id: string;
}

type CreateEntryResponse = {
  status: boolean;
  response: IEntry;
};

type GroupComponentProps = {
  selectgrouphandle: Function;
};

type FieldsComponentType = {
  selectedgroup: string;
  refreshall: boolean;
  refreshgroupentities: Function;
  passwords: IEntry[];
};

type GroupId = {
  id: string;
};

type GetEntriesResponse = {
  status: boolean;
  response: Array<IEntry>;
};

type TableComponentProps = {
  password?: boolean;
  align?: "right" | "center" | "left";
};

type DeleteEntryResponse = {
  status: boolean;
  respond: IEntry | null;
};

type EditEntry = {
  _id: string | undefined;
  title: string;
  username: string;
  password: string;
  note: string;
  url: string;
  passwordExpiredDate?: string;
};

type EditEntryResponse = {
  status: boolean;
  respond: IEntry;
};
type PopupType = "success" | "error" | "info";

type PopUpElementProps = {
  type: PopupType;
  visible: boolean;
};

type Meta = {
  crateDate: string;
  firstEditDate: string;
  editDate: string;
};
type UserMeta = Meta & {
  lastLogin: string;
  lastPassword: string;
};
type IUser = {
  login: string;
  password: string;
  email: string;
  defaultPasswordForEntries: string | null;
  meta: UserMeta;
};

type EntryPaginator = {
  page: number;
};

type PaginatorType = {
  hasMore: boolean;
  items: number;
  page: number;
};

type PaginatorComponentProps = {
  pageInfo?: PaginatorType | null;
  paginationChange: (pageInfo: EntryPaginator) => void;
};

type ReturnEntiresType = {
  entries: IEntry[];
  paginator?: {
    hasMore: boolean;
    items: number;
    page: number;
  } | null;
};

type EntryInput = {
  paginator: EntryPaginator;
  title: string;
  groupId: string | null;
};

type EntriesFetchResponse = { data: IEntry[]; pageInfo: PaginatorType };

type PassComponentProps = {
  store?: IGeneral;
};

type SearchFiledInputProps = {
  onSearchFieldChange: (value: string) => void;
};

type UserUpdate = Partial<Pick<IUser, "email" | "login" | "password">> & {
  importPassword?: string | undefined;
};

type EntryData = {
  data: IEntry[];
  pageInfo: PaginatorType;
};

type RestoreEntryBody = { entryId: string };

type EditNotification = {
  _id: string;
  notficationDate?: string;
  notificationChannel?: "Account" | "Email" | "Sms";
  active?: boolean;
};

type NotificationLike = {
  _id: string;
  active: boolean;
};

type EntriesToImport = {
  email: string;
  password: string;
  title: string;
  url: string;
  username: string;
};
type ImportRequestData = {
  _id: string;
  created: string;
  state: string;
  userid: string;
  entriesToImport: EntriesToImport[];
};

type ImportRequestState = "active" | "complete" | "deleted";

type EditImportRequest = {
  userid?: string;
  created?: string;
  state?: ImportRequestData;
  entriesToImport?: EntriesToImport[];
};
