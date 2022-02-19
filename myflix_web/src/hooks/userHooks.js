import { useContext } from "react";
import { UserContext } from "../providers/userProvider";

const useUser = () =>{
    const { userState, setUsername } = useContext(
        UserContext
    );

    return { userState, setUsername};
}

export default useUser;