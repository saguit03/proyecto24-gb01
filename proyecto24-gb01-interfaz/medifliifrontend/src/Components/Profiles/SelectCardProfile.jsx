import React, { useContext } from 'react'
import ProfileContext from '../../context/ProfileContext'
import { useNavigate } from 'react-router-dom'
import PopOverPinProfile from './PopOverPinProfile'

export default function SelectCardProfile({prof}) {
  const navigate = useNavigate()
  const {profile, setProfile} = useContext(ProfileContext)
  const handleSelectProfile = () => {
    setProfile(prof)
    setTimeout(()=>console.log(profile),2000)
    navigate("/app/user/config")
    
    }
    
  return (
    <div className = "card-profile" >
      <button popovertarget = {`profileID${prof['id-profile']}`}>Nombre perfil: {prof.profileName}</button>
      
      <PopOverPinProfile tryProfile={prof}/>
    </div>
  )
}
