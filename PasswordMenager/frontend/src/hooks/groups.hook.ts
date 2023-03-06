import { useState, useEffect } from "react";
import { Group } from "../utils/group.utils";

export const GroupEffect = (refetch: boolean): IGroup[] => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const fetchGroups = async (): Promise<void> => {
    const groupresponse: GroupResponse =
      await Group.getInstance().GetGroupsByUser();
    setGroups(groupresponse.response);
  };

  useEffect(() => {
    fetchGroups();
  }, [refetch]);

  return groups;
};
