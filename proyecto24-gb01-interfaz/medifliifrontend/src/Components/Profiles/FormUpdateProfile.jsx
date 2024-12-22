import React, { useContext, useEffect, useState } from 'react'
import profilesService from '../../Controller/profileController';
import ProfileContext from '../../context/ProfileContext';
import { useNavigate } from 'react-router-dom';

export default function FormUpdateProfile() {
    const [nombre, setNombre] = useState("");
    const [pin, setPin] = useState("");
    const [idUser, setIdUser] = useState("");
    const [idLanguage, setIdLanguage] = useState("");
    const navigate = useNavigate()
    const {profile, setProfile} = useContext(ProfileContext)
    const [error, setError] = useState(null);
     const [loading, setLoading] = useState(true)

    const handleSubmitUpdateProfile = async (event)=>{
        const updateData = {
          "id-profile": profile['id-profile'],
          "idUser": profile.idUser,
          "profileName": nombre,
          "Pin": pin
        }
        event.preventDefault();
        const response = await profilesService.updateProfileById(profile['id-profile'],updateData).then((response)=>{
         
          setProfile(response)
          navigate("/app/user/config")

        })
        .catch((error)=>{
            setError(error)
        })
    }

    useEffect(()=>{
      setNombre(profile.profileName)
      setPin(profile.Pin)
      console.log(profile)
    },[])
  return (
    <>
    
    <div className="card-header">
            <h5 className="text-center">Modificar tu perfil de usuario</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmitUpdateProfile}>
              <label>¿Qué nombre deseas poner?</label>
              <input
                type="text"
                className="form-control mb-3"
                name="name"
                required=""
                onChange={(e)=>setNombre(e.target.value)}
                value={nombre}
              />
              <br />
              <br />
              <label>¿Quieres cambiar la contraseña?</label>
              <input
                type="number"
                className="form-control mb-3"
                name="pin"
                required
                onChange={(e)=>setPin(e.target.value)}
                value={parseInt(pin)}
                
                
              />
              <br />
              <br />
              {/* <label>¿A qué idioma quieres cambiar?</label>
              <input
                type="number"
                className="form-control mb-3"
                name="idLanguage"
                onChange={(e)=>setIdLanguage(e.target.value)}
              /> */}
              <br />
              <br />
              <button className="btn btn-primary" type="submit">
                
                Guardar
              </button>
            </form>
          </div>
    
    </>
  )
}
