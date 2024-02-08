import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
import PassBar from "../PassBarr";
import AccountContainer from "./AccountContainer/index";
import { LanguageChange } from "./LanguageChange";
import { Bar, LeftSide, RigthSide } from "./component.styled";

type AppBarProps = {
  store?: IGeneral;
};
type AppBarLeftSideProp = {
  userActive?: boolean;
};
const AppBarLeftSide = ({ userActive }: AppBarLeftSideProp): JSX.Element => {
  return <LeftSide>{userActive ? <PassBar></PassBar> : null}</LeftSide>;
};

const AppBar = ({ store }: AppBarProps): JSX.Element => {
  return (
    <Bar>
      <AppBarLeftSide userActive={store?.UserActivity} />
      <RigthSide>
        <LanguageChange />
        {!store?.IsLocal && <AccountContainer />}
      </RigthSide>
    </Bar>
  );
};
export default inject("store")(observer(AppBar));
