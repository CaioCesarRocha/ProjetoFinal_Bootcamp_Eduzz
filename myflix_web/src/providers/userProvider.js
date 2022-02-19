import React, { createContext, useCallback, useState } from "react";
//import api from "../services/api";

export const UserContext = createContext({
    user:{},
});

const UserProvider = ({ children }) => {
    const [userState, setUserState] = useState({
        id: '',
        username: '',
    })



    const setUsername = (props) => {

        setUserState((prevState)=> ({
           ...prevState,
           id: props.uuid,
           username: props.username
        }));  
    }



    const contextValue = {
        userState, 
        setUsername: useCallback((user) => setUsername(user), []),    
        /*getMovie: useCallback((movieName) => getMovie(movieName), []),
        addList: useCallback((movie) => addList(movie), []),
        removeList: useCallback((myList, idMovie) => removeList(myList, idMovie), []),
        getRelated: useCallback((movie) => getRelated(movie), []),*/
    };


    return (
        <UserContext.Provider value={contextValue}>
          {children}
        </UserContext.Provider>
    );
}


export default UserProvider;

  