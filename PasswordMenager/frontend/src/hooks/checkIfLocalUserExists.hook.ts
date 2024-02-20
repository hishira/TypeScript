import { useEffect } from "react"
import { LocalDatabases } from "../local-database/init";
import { useHistory } from "react-router-dom";

export const CheckIfLocelUserExists = (): void => {
    const history = useHistory();
    useEffect(()=>{
        LocalDatabases.getInstance()
        .getDatabase("user")
        .getAll()
        .then((userArray) => {
          if (userArray.length <= 0) {
            history.push("/local-signup");
          }
        });
    },[])
}