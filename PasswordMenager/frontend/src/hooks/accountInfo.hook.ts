import { useEffect, useState } from "react";
import { GetAccountInfoPromise } from "../components/AppBar/AccountContainer/AccountInfo/utils";

export const AccountInfoEffect = (
  refetch?: boolean
): {
  userinfo: IUser | undefined;
  importRequests: any[];
  loading: boolean;
} => {
  const [userinfo, setUserinfo] = useState<IUser>();
  const [importRequests, setImportRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetAccountInfoPromise().then((values) => {
      const [importsInfo, user] = values;
      setUserinfo(user);
      setImportRequests(importsInfo);
      setLoading(false);
    });
  }, [refetch]);

  return { userinfo, importRequests, loading };
};
