import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
import PassBar from "../PassBarr";
import AccountContainer from "./AccountContainer/index";
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
        <AccountContainer />
      </RigthSide>
    </Bar>
  );
};
export default inject("store")(observer(AppBar));
