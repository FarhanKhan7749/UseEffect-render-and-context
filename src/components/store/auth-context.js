import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogOut : () => {},
    onLogIn : (email,password) => {}
});

export const AuthContextProvider = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const storedUserLoggedInInformation =localStorage.getItem("isLoggedIn");
        if(storedUserLoggedInInformation === '1'){
          setIsLoggedIn(true);
        }
      },[]);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
    };

    return( 
    <AuthContext.Provider value={
        {
            isLoggedIn:isLoggedIn,
            onLogIn:loginHandler,
            onLogOut:logoutHandler
        }
    }>
        {props.children}
    </AuthContext.Provider>
    );
};

export default AuthContext;