import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import usersService from '../../Controller/userController';

export default function ConfirmDeleteUser() {
    const navigate = useNavigate();
    const {user, setUser,isLoggedIn,setIsLoggedIn} = useContext(UserContext)
    const [error, setError] = useState(null)
    const handleDeleteUser = async (event)=>{
        event.preventDefault();
        usersService.deleteUser(user.idUser).then((response)=>{
            setUser(null)
            setIsLoggedIn(false)
            window.localStorage.removeItem("User")
            navigate('/app')
        })
        .catch((error)=>{
            setError(error.message);
        })
    }
  return (
    <>
    
    <div className="container">
        <h1>¿De verdad quieres eliminar la cuenta?</h1>
        <p>No podrás recuperar la cuenta</p>
        <form onSubmit={handleDeleteUser}>
            <input type="submit" value="Eliminar cuenta" />
            <input type="button" onClick={navigate("/app/user/config")} value="Cancelar" />
        </form>
    </div>
    
    </>
  )
}
