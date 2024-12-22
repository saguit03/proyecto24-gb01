import { createContext, useState } from "react";

 const ProfileContext = createContext({})
export function ProfileContextProvider({children}){
    const [profile, setProfile] = useState(null)
    return <ProfileContext.Provider value={{profile, setProfile}}>
        {children}
    </ProfileContext.Provider>
}
export default ProfileContext;