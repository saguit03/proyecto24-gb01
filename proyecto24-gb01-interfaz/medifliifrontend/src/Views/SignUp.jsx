import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usersService from '../Controller/userController'

export default function SignUp() {
   const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleSignUp = (event)=>{
    let form = event.target
    event.preventDefault();
    // usersService.addUserForm(form.name.value, form.surname.value, form.username.value,form.email.value,form.password.value).then((response)=>{
    //   alert("Usuario creado con éxito")
      
    //   navigate("/app")
    // }).catch((error)=>{
    //   setError(error.message)
    // })
    // const user = {
    //   "username": form.username.value,
    //   "email": form.email.value,
    //   "password": form.password.value
    // }
    // usersService.addUser(user).then((response)=>{
    //   alert("Usuario creado con éxito")
    //   navigate("/app")
    // })
    const addUser = {
      "name": form.name.value,
      "surname": form.surname.value,
      "username": form.username.value,
      "email": form.email.value,
      "password": form.password.value
    }
    if(form.password.value !== form.repeatedPassword.value){
      setError("Las contraseñas no coinciden")
    }
    else{
      usersService.addUserForm(addUser.name,addUser.surname,addUser.username,addUser.email,addUser.password).then((response)=>{
      alert("Usuario creado con éxito")
      navigate("/app/login")
    })
    }

    
    
    
  }
  return (
    <>
  <title>Medifli.com</title>
  <meta charSet="utf-8" />
  <link rel="icon" href="../assets/icons/medifli_M.png" />
  <link rel="stylesheet" href="./styles.css" />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <fieldset className="loginContainer headerMedifli whiteLetters">
    <div>
      <h5>
        <b>Crea tu cuenta</b>
      </h5>
      <div>
        <form  onSubmit={handleSignUp}>
          <label htmlFor="name" className="loginLables">
            {" "}
            Nombre{" "}
          </label>
          <span style={{ color: "#FF672C" }}>*</span>
          <input
            type="text"
            className="loginBox"
            size={46}
            placeholder="Introduce tu nombre"
            required
            name="name"
            id='name'
          />
          <label htmlFor="surname" className="loginLables">
            {" "}
            Apellido{" "}
          </label>
          <input
            type="text"
            className="loginBox"
            size={46}
            placeholder="Introduce tu apellido"
            name="surname"
            id = "surname"
            required
          />
          <label htmlFor="username" className="loginLables">
            
            Username
          </label>
          <input
            type="text"
            className="loginBox"
            size={46}
            placeholder="Introduce tu apellido"
            name="username"
            required
            id= "username"
          />
          <label htmlFor="email" className="loginLables">
            {" "}
            Email{" "}
          </label>
          <span style={{ color: "#FF672C" }}>*</span>
          <input
            type="text"
            className="loginBox"
            size={46}
            placeholder="Introduce tu e-mail"
            
            name="email"
            required
            id="email"
          />
          <label htmlFor="password" className="loginLables">
            {" "}
            Contraseña{" "}
          </label>
          <span style={{ color: "#FF672C" }}>*</span>
          <input
            type="password"
            id="password"
            className="loginBox"
            size={46}
            placeholder="Introduce tu contraseña"
            required
            name="password"
            min={4}
          />
          
          <div>
            <label htmlFor="repeatedPassword" className="loginLables">
              {" "}
              Confirma la contraseña{" "}
            </label>
            <span style={{ color: "#FF672C" }}>*</span>
            <input
              type="password"
              id="repeatedPassword"
              className="loginBox"
              size={46}
              placeholder="Confirma tu contraseña"
              required
              name="repeatedPassword"
            />
            <p />
          </div>
          <div>
            <input
              type="submit"
              className="form-control whiteLetters"
              id="loginButton"
              defaultValue="Crear una cuenta"
              value={"Crear usuario"}
            />
          </div>
          {error? <p className="small-font" style={{ textAlign: "center" }}>
            {error} </p>: null}
          
          
        </form>
      </div>
    </div>
    <div>
      <div className="center-text">
        <p />
        <div className="top-borders margin-elements">
          <p />
          <p className="twelvePx">
            {" "}
            Al iniciar sesión o al crear una cuenta, aceptas nuestros Términos y
            condiciones y la Política de privacidad{" "}
          </p>
          <div>
            <p className="twelvePx" id="allRightsReserved">
              Todos los derechos reservados
            </p>
            <span className="twelvePx">Copyright 2024 - Medifli.com</span>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</>

  )
}
