import React from "react";
import styled from "styled-components";
import Button from "../Button/index";
import { useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { IGeneral } from "../../models/General";
import { removeStorage } from "../../utils/localstorage.utils";
const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 4px 10px;
`;
const LeftSide = styled.div``;
const RigthSide = styled.div`
  padding: 0.5rem;
`;
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
    removeStorage();
    hisotry.push("/login");
  };
  return (
    <Bar>
      <LeftSide />
      <RigthSide>
        {!store?.UserActivity ? (
          <Button onClick={() => loginclick()} color="lightblue">
            Login
          </Button>
        ) : (
          <Button onClick={logouthandle} color="lightblue">Logout</Button>
        )}
      </RigthSide>
    </Bar>
  );
};
export default inject("store")(observer(AppBar));
