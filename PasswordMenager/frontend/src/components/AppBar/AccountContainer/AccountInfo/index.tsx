import { Dispatch, SetStateAction, useState } from "react";
import { AccountInfoEffect } from "../../../../hooks/accountInfo.hook";
import { Loading } from "../../../Loading";
import { TranslationFunction } from "../../../Translation";
import { ContentType, GetCurrentView } from "./AccountInfoView";
import UserView from "./UserView";
import {
  AccountInfoContainer,
  AccountInfoContent,
  AccountInfoHeader,
  Devider,
  HeaderButton,
} from "./component.styled";

type HeaderButtonsProps = {
  mainContentView: string;
  setMainContentView: Dispatch<SetStateAction<ContentType>>;
};

type HeaderButton = HeaderButtonsProps & {
  contentView: ContentType;
};

const ContentMapperToTranslationString: { [key in ContentType]: string } = {
  Notification: "account.view.accountInfo.notification",
  ImportRequest: "account.view.accountInfo.importRequest",
  Last: "account.view.accountInfo.lastDeleted",
};

const PrepareTranslation = (contentType: ContentType): string => {
  const translationString = ContentMapperToTranslationString[contentType];

  return TranslationFunction(translationString);
};

const HeaderButtonComponent = ({
  mainContentView,
  setMainContentView,
  contentView,
}: HeaderButton) => {
  const translation = PrepareTranslation(contentView);
  return (
    <HeaderButton
      onClick={() => setMainContentView(contentView)}
      active={mainContentView === contentView}
    >
      {translation}
    </HeaderButton>
  );
};
const HeaderButtons = ({
  mainContentView,
  setMainContentView,
}: HeaderButtonsProps) => (
  <AccountInfoHeader>
    <HeaderButtonComponent
      setMainContentView={setMainContentView}
      mainContentView={mainContentView}
      contentView="Notification"
    />
    <HeaderButtonComponent
      setMainContentView={setMainContentView}
      mainContentView={mainContentView}
      contentView="ImportRequest"
    />
    <HeaderButtonComponent
      setMainContentView={setMainContentView}
      mainContentView={mainContentView}
      contentView="Last"
    />
  </AccountInfoHeader>
);
const AccountInfo = () => {
  const [mainContentView, setMainContentView] =
    useState<ContentType>("Notification");
  const [refetch, setRefetch] = useState<boolean>(false);
  const { userinfo, importRequests, loading } = AccountInfoEffect(refetch);

  return (
    <Loading
      loading={loading}
      ComponentToLoad={
        <AccountInfoContainer>
          <UserView user={userinfo} setRefetch={setRefetch}></UserView>
          <Devider />
          <HeaderButtons
            mainContentView={mainContentView}
            setMainContentView={setMainContentView}
          />
          <Devider />
          <AccountInfoContent>
            {GetCurrentView(mainContentView, importRequests, setRefetch)}
          </AccountInfoContent>
        </AccountInfoContainer>
      }
    />
  );
};

export default AccountInfo;
