import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { LocalRegisterComponent } from "../../components/LocalRegister";
import { IGeneral } from "../../models/General";
import { Auth } from "../../utils/auth.utils";
import { ErrorPopUpObject, SuccessPopUpObject } from "../../utils/popup.utils";

const LocaSignUp = ({ store }: { store?: IGeneral }) => {
  const history = useHistory();
  const localRegisterHandle = (password: string) => {
    Auth.getInstance()
      .registerUser({
        password: password,
      })
      .then((response) => {
        if (response) {
          store?.setPopUpinfo(
            SuccessPopUpObject("Create local account successfull")
          );
          history.push("/login");
          return;
        }
        store?.setPopUpinfo(
          ErrorPopUpObject("Error occur while creating local account")
        );
      });
  };
  return <LocalRegisterComponent localRegisterHandle={localRegisterHandle} />;
};

export default inject("store")(observer(LocaSignUp));
