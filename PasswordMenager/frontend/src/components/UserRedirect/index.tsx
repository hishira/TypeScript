import { inject, observer } from "mobx-react";
import { Redirect, Route } from "react-router-dom";
import { PrivateComponentType } from "../PrivateRoute";

const UserRedirect = ({ store, Component, path }: PrivateComponentType) => {
  console.log(store?.UserActivity);
  return (
    <Route
      path={path}
      exact
      render={() =>
        !store?.UserActivity ? <Component /> : <Redirect to="/store" />
      }
    />
  );
};
export default inject("store")(observer(UserRedirect));
