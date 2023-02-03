import React, { useState, useEffect } from "react";
import { GetGroupsByUser } from "../utils/group.utils";

export const GroupEffect = (refetch: boolean): IGroup[] => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const fetchGroups = async (): Promise<void> => {
    const groupresponse: GroupResponse = await GetGroupsByUser();
    setGroups(groupresponse.response);
    console.log(groupresponse.response);
  };

  useEffect(() => {
    fetchGroups();
  }, [refetch]);

  return groups;
};
