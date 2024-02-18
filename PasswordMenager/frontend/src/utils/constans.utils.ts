const EMPTYENTRYRESPONSE: IEntry = {
  _id: "",
  title: "",
  username: "",
  password: "",
  note: "",
  groupid: "",
  url: "",
};

const EMPTYGROUPRESPONSE: IGroup = { _id: "", name: "", userid: "" };

export { EMPTYENTRYRESPONSE, EMPTYGROUPRESPONSE };

export const ExampleTokesResponseForLocalEnvironment = {
  access_token: "example_access_token",
  refresh_token: "123123",
};
