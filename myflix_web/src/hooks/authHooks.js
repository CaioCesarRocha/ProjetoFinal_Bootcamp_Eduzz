import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";

const useAuth = () =>{
    const {   userState, setUsername } = useContext(
        AuthContext
    );

    return {  userState, setUsername};
}

export default useAuth;