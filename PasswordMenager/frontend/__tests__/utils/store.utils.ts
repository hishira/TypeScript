import { General } from "../../src/models/General";

export const POPUPMESSAGE = "Example popup message";
export const POPUPTYPE = "error";
export const getStoreForPopUp = () =>
  General.create({
    useractive: true,
    popUpelement: {
      open: true,
      type: POPUPTYPE,
      message: POPUPMESSAGE,
    },
  });

export const DEFAULTPOPUPELEMENT = {
  open: true,
  type: POPUPTYPE,
  message: POPUPMESSAGE,
};

export const getPrivateRouteStore = (useractive: boolean = true) => {
  return General.create({
    useractive,
    popUpelement: DEFAULTPOPUPELEMENT,
  });
};
