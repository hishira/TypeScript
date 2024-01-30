export interface GroupFetch {
  getGroupByUser(token: string): Promise<Response>;

  createGroup(createGroup: CreateGroup, token: string): Promise<Response>;

  deleteGroup(groupId: string, token: string): Promise<Response>;

  editGroup(
    groupId: string,
    token: string,
    editGroup: { name: string }
  ): Promise<Response>;
}
