import { useEffect, useState } from "react";
import { GetAccountInfoPromise } from "../components/AppBar/AccountContainer/AccountInfo/utils";

export const AccountInfoEffect = (
  refetch?: boolean
): {
  userinfo: IUser | undefined;
  importRequests: any[];
  notification: any[];
  loading: boolean;
} => {
  const [userinfo, setUserinfo] = useState<IUser>();
  const [importRequests, setImportRequests] = useState<any[]>([]);
  const [notification, setNotification] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetAccountInfoPromise().then((values) => {
      const [importsInfo, user, activeNotifications] = values;
      setUserinfo(user);
      setImportRequests(importsInfo);
      setNotification(activeNotifications);
      setLoading(false);
    });
  }, [refetch]);

  return { userinfo, importRequests, notification, loading };
};
