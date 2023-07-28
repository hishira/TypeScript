import { useEffect } from "react";
import { AccountInfoContainer, AccountInfoHeader, HeaderButton } from "./component.styled";
import { Import } from "../../../../utils/import.utils";

const AccountInfo = () => {
  useEffect(()=>{
    Import.getInstance().ImportRequest().then(console.log)
  }, [])
  return (
    <AccountInfoContainer>
      <AccountInfoHeader>
        <HeaderButton>Notification</HeaderButton>
        <HeaderButton>Import request</HeaderButton>
      </AccountInfoHeader>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
