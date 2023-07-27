import { AccountInfoContainer, AccountInfoHeader, HeaderButton } from "./component.styled";

const AccountInfo = () => {
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
