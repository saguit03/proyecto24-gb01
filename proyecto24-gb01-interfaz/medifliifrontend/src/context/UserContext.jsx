import React, { useState, createContext } from "react"


 const UserContext = createContext({})
export function UserContextProvider({children}){
    const [jwt, setJWT] = useState(null)
    const [isLoggedIn, setIsLoggedIn] =useState(false);
    const [user, setUser] = useState(null)
    const [listFavorites, setListFavorites] = useState([])
    return <UserContext.Provider value={{jwt, setJWT,user, setUser, isLoggedIn, setIsLoggedIn, listFavorites, setListFavorites}}>
        {children}
    </UserContext.Provider>
}
export default UserContext;