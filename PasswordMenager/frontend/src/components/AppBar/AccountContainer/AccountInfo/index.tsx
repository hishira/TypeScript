import { useEffect, useState } from "react";
import { Import } from "../../../../utils/import.utils";
import { User } from "../../../../utils/user.utils";
import {
  AccountInfoContainer,
  AccountInfoHeader,
  HeaderButton,
  UserIcons,
  UserInfo,
  UserInforContainer,
} from "./component.styled";
import { EditIcon } from "../../../icons/EditIcon";

const AccountInfo = () => {
  const [userinfo, setUserInfo] = useState<IUser>();
  useEffect(() => {
    const firstPromise = Import.getInstance().ImportRequest();
    const secondPromise = User.getInstance().getUserInfo();
    Promise.all([firstPromise, secondPromise]).then((values) => {
      const [importsInfo, user] = values;
      setUserInfo(user);
    });
  }, []);
  return (
    <AccountInfoContainer>
      <UserIcons>
        <EditIcon />
      </UserIcons>
      <UserInforContainer>
        <UserInfo>
          <span>Email</span> <span>{userinfo?.email}</span>
        </UserInfo>
        <UserInfo>
          <span>Login</span> <span>{userinfo?.login}</span>
        </UserInfo>
      </UserInforContainer>
      <AccountInfoHeader>
        <HeaderButton>Notification</HeaderButton>
        <HeaderButton>Import request</HeaderButton>
      </AccountInfoHeader>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
