import React, { useContext, useState } from 'react'
import profilesService from '../../Controller/profileController';
import UserContext from '../../context/UserContext';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';

export default function FormCreateProfile() {
    const [nombre, setNombre] = useState("");
    const [pin, setPin] = useState("");
    // const [idUser, setIdUser] = useState("");
    // const [idLanguage, setIdLanguage] = useState("");
    const [error, setError] = useState(null);
    const {user, setUser,isLoggedIn,setIsLoggedIn} = useContext(UserContext)
    const navigate = useNavigate()
    const handleSubmitPostProfile = async (event)=>{
        const newProfile = {
          "id-profile": 1,
          "idUser": user.idUser,
          "profileName": nombre,
          "Pin": pin
        }
        console.log(newProfile)
        event.preventDefault();
        await profilesService.addProfile(newProfile).then((response)=>{
          console.log(response)
          navigate("/app/profiles/selectProfile")
        }).catch((error)=>{
            setError(error.message)
        })
    }
  return (
    <>
    
    <form action="" onSubmit={handleSubmitPostProfile}> 
      <label htmlFor="profile_name">Nombre del perfil: </label>
      <input type="text" name="profile_name" id="profile_name" 
      onInput={(e)=> setNombre(e.target.value)}
      value={nombre}
      />

      <label htmlFor="pin">Introduce el pin: </label>
      <input type="text" name="pin" id="pin" pattern='[0-9]{4}'
      onInput={(e)=> setPin(e.target.value)}
      value={pin}
      
      />
      <button type='submit'>Crear perfil</button>
    </form>
    
    </>
  )
}
