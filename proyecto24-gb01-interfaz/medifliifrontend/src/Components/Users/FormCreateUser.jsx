import React, { useState } from 'react'
import usersService from '../../Controller/userController';

export default function FormCreateUser() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmitPostUser = async (event)=>{
        
        event.preventDefault();
        const response = await usersService.addUser(nombre,email,password).catch((error)=>{
            setError(error.message)
        })
    }
  return (
    <>
    
    <div className="card-header">
            <h5 className="text-center">Insertar User</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmitPostUser}>
              <label>Nombre del User</label>
              <input
                type="text"
                className="form-control mb-3"
                name="username"
                required=""
                onChange={(e)=> setNombre(e.target.value)}
              />
              <br />
              <br />
              <label>Email del User</label>
              <input
                type="email"
                className="form-control mb-3"
                name="email"
                required=""
                onChange={(e)=> setEmail(e.target.value)}
              />
              <br />
              <br />
              <label>Contraseña del User</label>
              <input
                type="password"
                className="form-control mb-3"
                name="password"
                required=""
                onChange={(e)=> setPassword(e.target.value)}
              />
              <br />
              <br />
              <button className="btn btn-primary" type="submit">
                
                Añadir
              </button>
            </form>
          </div>
    
    </>
  )
}
