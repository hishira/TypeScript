import { Import } from "../../../../utils/import.utils";
import { User } from "../../../../utils/user.utils";

export const GetAccountInfoPromise = (): Promise<any> => {
  const firstPromise = Import.getInstance().ImportRequest();
  const secondPromise = User.getInstance().getUserInfo();
  return Promise.all([firstPromise, secondPromise]);
};
