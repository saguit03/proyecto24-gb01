import React, { useEffect, useState } from 'react'
import usersService from '../../Controller/userController';
import FormCreateUser from '../../Components/Users/FormCreateUser';

export default function User({}) {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        usersService.getAllUsers((response)=>{
            setUsers(response)
            console.log(response)
        }).catch((error)=> console.log(error.message))
    },[])
  return (
    <>
        

  <div className="container">
    <h1 className="text-center mt-5 mb-5"> MedifliStats - Users</h1>
  </div>
  <div className="container">
    <div className="row row-col-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
      <div className="col-md-6 mb-3">
        <div className="card">
          

          

        <div className="card-header">
            <h5 className="text-center">Modificar User</h5>
          </div>
          <div className="card-body">
            <form action="/users/userUpdated" method="POST">
              <input type="hidden" name="method" defaultValue="PUT" />
              <label htmlFor="idUser">
                ¿Qué id tiene el User que quieres modificar?
              </label>
              <input type="number" id="idUser" name="idUser" required="" />
              <br />
              <br />
              <label>¿Qué nombre deseas poner?</label>
              <input
                type="text"
                className="form-control mb-3"
                name="username"
                required=""
              />
              <br />
              <br />
              <label>¿Quieres cambiar el email?</label>
              <input
                type="email"
                className="form-control mb-3"
                name="email"
                required=""
              />
              <br />
              <br />
              <label>¿Qué contraseña quieres poner?</label>
              <input
                type="password"
                className="form-control mb-3"
                name="password"
              />
              <br />
              <br />
              <button className="btn btn-primary" type="submit">
                
                Guardar
              </button>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  </div>

  {users}


    </>
    
  )
}
