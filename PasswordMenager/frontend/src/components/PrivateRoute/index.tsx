import React from "react";
import { inject, observer } from "mobx-react";
import { Redirect, Route } from "react-router-dom";
import { IGeneral } from "../../models/General";
export type StoreType = {
  store?: IGeneral;
};
export interface PrivateComponentType extends StoreType {
  Component: any;
  path: string;
};
const PrivateComponent = ({
  store,
  Component,
  path,
}: PrivateComponentType): JSX.Element => {
  return (
    <Route
      path={path}
      render={() =>
        store?.UserActivity ? (<Component />) : (<Redirect to="/login" />)
      }
    />
  );
};
export default inject("store")(observer(PrivateComponent));
