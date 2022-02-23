import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";

const useAuth = () =>{
    const { signed, userState, setUsername } = useContext(
        AuthContext
    );

    return { signed, userState, setUsername};
}

export default useAuth;