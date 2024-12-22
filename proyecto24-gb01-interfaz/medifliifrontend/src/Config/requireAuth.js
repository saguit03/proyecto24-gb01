import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";
import ProfileContext from "../context/ProfileContext";

export const RequireAuth = () => {
  const {user, setUser,isLoggedIn,setIsLoggedIn} = useContext(UserContext)
  const {profile, setProfile} = useContext(ProfileContext)

if (!isLoggedIn) {

return <Navigate to="/app/login"/>

}
// if(profile === null){
//   return <Navigate to="/app/profiles/selectProfile"/>
// }



return <Outlet/>

};