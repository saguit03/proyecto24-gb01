import React, { useState } from 'react'
import profilesService from '../../Controller/profileController';

export default function FormDeleteProfile() {
    const[idProfile, setIdProfile] = useState(0)
    const [error, setError] = useState(null);
    const handleDeleteProfile = async (event)=>{
        event.preventDefault();
        profilesService.deleteProfileForm(idProfile).catch((error)=>{
            setError(error.message);
        })
    }
  return (
    <>
          <div className="card-header">
            <h5 className="text-center">Borrar ProfileUser</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleDeleteProfile}>
              <label>¿Qué id tiene el Profile que deseas borrar?</label>
              <input
                type="number"
                id="idProfile"
                className="form-control mb-3"
                name="idProfile"
                onChange={(e)=>setIdProfile(e.target.value)}
                value={idProfile}
              />
              <button className="btn btn-primary" type="submit">
               
                Borrar
              </button>
            </form>
          </div>
    </>
  )
}
