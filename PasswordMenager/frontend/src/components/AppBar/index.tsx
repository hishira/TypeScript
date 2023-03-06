import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { IGeneral } from "../../models/General";
import { SessionStorage } from "../../utils/localstorage.utils";
import Button from "../Button/index";
import PassBar from "../PassBarr";
import { Bar, LeftSide, RigthSide } from "./component.styled";

type AppBarProps = {
  store?: IGeneral;
};
const AppBar = ({ store }: AppBarProps): JSX.Element => {
  const hisotry = useHistory();
  const loginclick = () => {
    hisotry.push("/login");
  };
  const logouthandle = () => {
    store?.setUserActive(false);
    SessionStorage.getInstance().removeStorage();
    hisotry.push("/login");
  };
  return (
    <Bar>
      <LeftSide>
        <PassBar></PassBar>
      </LeftSide>
      <RigthSide>
        {!store?.UserActivity ? (
          <Button onClick={() => loginclick()} color="lightblue">
            Login
          </Button>
        ) : (
          <Button onClick={logouthandle} color="lightblue">
            Logout
          </Button>
        )}
      </RigthSide>
    </Bar>
  );
};
export default inject("store")(observer(AppBar));
