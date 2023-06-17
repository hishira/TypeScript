import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { IGeneral, View } from "../../models/General";
import { SessionStorage } from "../../utils/localstorage.utils";
import Button from "../Button/index";
import PassBar from "../PassBarr";
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
  const hisotry = useHistory();
  const logouthandle = () => {
    store?.setUserActive(false);
    SessionStorage.getInstance().removeStorage();
    hisotry.push("/login");
  };
  const clickHandle = () => {
    store?.setViewType(View.Card);
  };
  return (
    <Bar>
      <AppBarLeftSide userActive={store?.UserActivity} />
      <RigthSide>
        {!store?.UserActivity ? null : (
          <>
            <Button onClick={logouthandle} color="lightblue">
              Logout
            </Button>
            <Button onClick={clickHandle}>Change view</Button>
          </>
        )}
      </RigthSide>
    </Bar>
  );
};
export default inject("store")(observer(AppBar));
