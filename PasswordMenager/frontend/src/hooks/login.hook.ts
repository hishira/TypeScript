import { useEffect } from "react";
import { IGeneral } from "../models/General";

export const LoginHook = (history: any, store?: IGeneral) => {
  useEffect(() => {
    if (store?.UserActivity) history.push("/store");
  }, [history, store?.UserActivity]);
};
