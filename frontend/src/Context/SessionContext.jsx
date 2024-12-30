import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

// eslint-disable-next-line react-hooks/rules-of-hooks
export const UserSession = () => useContext(SessionContext);

// eslint-disable-next-line react/prop-types
const SessionProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = (data) => {
        if (data) {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    return(
        <SessionContext.Provider value={{isLoggedIn, user, login, logout}}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider;