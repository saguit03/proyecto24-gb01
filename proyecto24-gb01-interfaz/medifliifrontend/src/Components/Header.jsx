import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './../css/header.css'
import UserContext from '../context/UserContext'
import funcionesComunes from '../Config/funcionesComunes'
import SearchSimpleContentForm from './Busqueda/SearchSimpleContentForm'

export default function Header() {
    const navigate = useNavigate()
    const {user, setUser,isLoggedIn,setIsLoggedIn} = useContext(UserContext)
    useEffect(()=>{
        const localUser = window.localStorage.getItem("User")
        if(localUser){
            const JSONuser = JSON.parse(localUser)
            setUser(JSONuser)
            setIsLoggedIn(true)
        }
    },[])

  const handleLogout = ()=>{
        window.localStorage.removeItem("User")
        setUser(null)
        setIsLoggedIn(false)

    }
  
  const handleSearch = (e)=>{
    e.preventDefault()
    const {name, value} = e.target.search
    const searchParam = new URLSearchParams()
    searchParam.append("title", value)
    funcionesComunes.search(e.target).then((response)=> navigate(`/app/search?${response.toString()}`))
    
    
  }
  return (
    <header className='topsidebar-header'>
        <NavLink to={"/app"}>
            <img src='/assets/icons/medifli_M.png' alt="M de mediflii" />
        </NavLink>

        {/* <form action="" method="get" className='search-header' onSubmit={handleSearch}>
            <input type="text" name="search" id="search" className='button-redondeado'/>
        </form> */}
        <SearchSimpleContentForm/>

        <section className="section-header-topbar">
        {
          isLoggedIn ? <>
          <NavLink to={"/user/config"}>
          ¡Hola, {user.Name}!
          </NavLink>
          <NavLink to="/app/login" className="btn btn-primary" onClick={handleLogout}> Cerrar sesión</NavLink>
          <NavLink to ="/app/save"> Mi lista de favoritos</NavLink>
            
            <NavLink to = "/app/user/config"> Mi cuenta</NavLink>
          </>
          :
          <>
          <NavLink to = "/app/user/config"> Mi cuenta</NavLink>
          <NavLink to="/app/login"> Inicio de sesión</NavLink>
            <NavLink to="/app/signup"> Registrarse</NavLink>

          </>
        }
            
        
        </section>



    
    </header>
  )
}
