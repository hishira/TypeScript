type UserAuth = {
  login: string;
  password: string;
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
  response: AuthTokens | null;
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
  refreshall: boolean,
  refreshgroupentities: Function,
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
};

type DeleteEntryResponse = {
  status: boolean;
  respond: IEntry | null;
};

type EditEntry = {
  _id: string | undefined,
  title: string,
  username: string,
  password: string,
  note: string,
}

type EditEntryResponse = {
  status: boolean,
  respond: IEntry
}
type PopupType = 'success' | 'error' | 'info'

type PopUpElementProps = {
  type: PopupType,
  visible: boolean,
}
