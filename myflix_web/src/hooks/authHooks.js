import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";

const useAuth = () =>{ //function passadas no context para ser usada em toda app
    const {   userState, setUsername } = useContext(  
        AuthContext
    );

    return {  userState, setUsername};
}

export default useAuth;