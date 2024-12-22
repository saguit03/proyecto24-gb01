import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import CardUser from '../../Components/Users/CardUser'
import ProfileContext from '../../context/ProfileContext'

export default function VerPerfil() {
    const navigate = useNavigate()
    const {user, setUser,isLoggedIn,setIsLoggedIn} = useContext(UserContext)
    const {profile, setProfile} = useContext(ProfileContext)

    
  return (
    <>
        <main>
             <CardUser user={user} />
             
        </main>
    </>
  )
}
