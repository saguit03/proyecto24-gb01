import React, { useCallback, useContext } from 'react'
import ProfileContext from '../../../context/ProfileContext'
import { Navigate, useNavigate } from 'react-router-dom'
import profilesService from '../../../Controller/profileController'

export default function DeleteProfile() {
    const {profile, setProfile} = useContext(ProfileContext)
    const navigate = useNavigate()
    const handleDeleteProfile = ()=>{
        console.log("Click sobre eliminar")
        profilesService.deleteProfileById(profile["id-profile"]).then((response)=>{
            console.log(response)
            setProfile(null)
            navigate("/app/profiles/selectProfile")
        })
        
    }
  return (
    <>
    <h1>¿DE VERDAD DESEAS ELIMINAR EL PERFIL DE {profile.profileName}?</h1>
    <button onClick={handleDeleteProfile}>Eliminar</button>
    </>
  )
}
