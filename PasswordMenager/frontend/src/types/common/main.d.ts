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
    name:string,
}

type CreateGroupResponse = {
    status: boolean,
    response: IGroup,
}

type CreateEntryDto = {
  title: string,
  username: string,
  password: string,
  note: string,
  groupid: string,
}

interface IEntry extends CreateEntryDto {
  _id: string,
}

type CreateEntryResponse = {
  status: boolean,
  response: IEntry,
}

type GroupComponentProps = {
  selectgrouphandle:Function, 
}

type FieldsComponentType = {
  selectedgroup:string,
}

type GroupId = {
  id:string,
}

type GetEntriesResponse = {
  status: boolean,
  response: Array<IEntry>
}

type TableComponentProps = {
  password?: boolean,
}




