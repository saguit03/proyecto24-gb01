import React, { useState } from 'react'
import usersService from '../../Controller/userController';

export default function FormDeleteUser() {
    const[idUser, setIdUser] = useState(0)
    const [error, setError] = useState(null);
    const handleDeleteUser = async (event)=>{
        event.preventDefault();
        usersService.deleteUserForm(idUser).catch((error)=>{
            setError(error.message);
        })
    }
  return (
    <>
          <div className="card-header">
            <h5 className="text-center">Borrar User</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleDeleteUser}>
              <label>¿Qué id tiene el User que deseas borrar?</label>
              <input
                type="number"
                id="idUser"
                className="form-control mb-3"
                name="idUser"
                onChange={(e)=>setIdUser(e.target.value)}
                value={idUser}
              />
              <button className="btn btn-primary" type="submit">
                
                Borrar
              </button>
            </form>
          </div>
    </>
  )
}
