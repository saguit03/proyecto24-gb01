import React, { useCallback, useContext, useEffect, useState } from 'react'
import usersService from '../../Controller/userController';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

export default function FormUpdateUser() {
   
    const navigate = useNavigate()
    const [nombre, setNombre] = useState(""); 
    const [apellidos, setApellidos] = useState(""); 
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const {user, setUser,isLoggedIn,setIsLoggedIn} = useContext(UserContext)

    useEffect(()=>{
		if(isLoggedIn){
			setApellidos(user.Surname)
			setEmail(user.Email)
			setNombre(user.Name)
      setUsername(user.Username)
			setPassword(user.Password)
		}
    
    setTimeout(()=>setIsLoading(false),2000)
	},[])
    const handleSubmitUpdateUser = async (event)=>{
      const updateUser = user
      updateUser.Name = nombre
      updateUser.Surname = apellidos
      updateUser.Username = username
      updateUser.Email = email
      updateUser.Password = password

//         const updatedUser = {
//     "idUser": user.IdUser, // number
//     "name": nombre, // string
//     "surname": apellidos, // string
//     "username": username, // string
//     "email": email, // string
//     "password": password, // string
//     "startDate": null, // string (puede ser una fecha en formato ISO)
//     "profilePicture": null, // string (ruta o URL de la imagen)
//     "registerDate": null, // string (puede ser una fecha en formato ISO)
//     "userProfiles": [], // array de objetos UserProfile
//     "creditCards": [], // array de objetos CreditCard
//     "language": null // objeto Language
// };
        event.preventDefault();
        
        const response = await usersService.actualizarUsuario(user.idUser,updateUser).then((response)=>{
          console.log(response)
          setUser(response)
          navigate("/app/user/config")

        })
        .catch((error)=>{
            setError(error.message)
        })
    }
  return (
    <>
    {isLoading? <Loading/> :
    <> 
      <div className="card-header">
            <h5 className="text-center">Modificar User</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmitUpdateUser}>
             
              <br />
              <br />
              <label>Nombre</label>
              <input
                type="text"
                className="form-control mb-3"
                name="name"
                required=""
                onChange={(e)=>setNombre(e.target.value)}
                value={nombre}
              />
              <label>Apellidos</label>
              <input
                type="text"
                className="form-control mb-3"
                name="surname"
                required=""
                onChange={(e)=>setApellidos(e.target.value)}
                value={apellidos}
              />
              <label>Username</label>
              <input
                type="text"
                className="form-control mb-3"
                name="username"
                required=""
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
              />
              <br />
              <br />
              <label>Email</label>
              <input
                type="email"
                className="form-control mb-3"
                name="email"
                required=""
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
              <br />
              <br />
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control mb-3"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
              <br />
              <br />
              <button className="btn btn-primary" type="submit">

                Guardar
              </button>
            </form>
          </div>
    </>
    }
    
    
    </>
  )
}
