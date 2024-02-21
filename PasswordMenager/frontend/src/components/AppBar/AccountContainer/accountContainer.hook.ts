import { RefObject, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IGeneral, View } from "../../../models/General";
import { SessionStorage } from "../../../utils/localstorage.utils";
const singleObject = {
  openMenu: false,
  setMenuOpen(value: boolean) {
    this.openMenu = value;
  },
};
const isMenuOpenAndNotClickedInMenu = (
  e: Event,
  subMenuRef: RefObject<HTMLDivElement>
) =>
  singleObject.openMenu &&
  e.target &&
  "id" in e.target &&
  subMenuRef.current?.id !== e.target?.id;

export const AccountContainerHook = (
  subMenuRef: RefObject<HTMLDivElement>,
  store?: IGeneral
) => {
  const [openAccountMenu, setOpenAccountMenu] = useState<boolean>(false);
  const [useInfo, setUseInfo] = useState<boolean>(false);

  const history = useHistory();
  if (store === undefined) throw new Error("Store is undefined");

  const logouthandle = () => {
    store?.setUserActive(false);
    SessionStorage.getInstance().removeStorage();
    history.push("/login");
  };

  const closeModalIfClickNotInModalArea = (e: Event) => {
    const isMenuOpenAndNotClicked = isMenuOpenAndNotClickedInMenu(
      e,
      subMenuRef
    );

    if (isMenuOpenAndNotClicked) {
      setOpenAccountMenu((a) => {
        singleObject.setMenuOpen(false);
        return !a;
      });
    }
  };

  const clickHandle = () => {
    const currentView = store?.ViewType;
    store?.setViewType(currentView === View.Table ? View.Card : View.Table);
    setOpenAccountMenu((a) => {
      singleObject.setMenuOpen(!a);
      return !a;
    });
  };
  const accountInfoClick = () => {
    setUseInfo(true);
    setOpenAccountMenu((a) => {
      singleObject.setMenuOpen(!a);
      return !a;
    });
  };

  const openHandle = (e: Event) => {
    e.stopPropagation();
    setOpenAccountMenu((a) => {
      singleObject.setMenuOpen(!a);
      return !a;
    });
  };
  const effectFunction = () => {
    document.addEventListener("click", closeModalIfClickNotInModalArea);
    return () =>
      document.removeEventListener("click", closeModalIfClickNotInModalArea);
  };
  useEffect(effectFunction, []);

  return {
    openHandle,
    clickHandle,
    accountInfoClick,
    logouthandle,
    useInfo,
    setUseInfo,
    openAccountMenu,
  };
};
