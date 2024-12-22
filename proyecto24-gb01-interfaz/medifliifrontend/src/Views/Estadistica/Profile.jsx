import React, { useEffect, useState } from 'react'
import profilesService from '../../Controller/profileController';
import FormCreateProfile from '../../Components/Profiles/FormCreateProfile';

export default function Profile({listProfiles}) {
    const [profiles, setProfiles] = useState([]);
    useEffect(()=>{
        profilesService.getAllProfiles((response)=>{
            setProfiles(response)
            console.log(response)
        }).catch((error)=> console.log(error.message))
    },[])
  return (
    <>
        

  <div className="container">
    <h1 className="text-center mt-5 mb-5"> MedifliStats - ProfileUsers</h1>
  </div>
  <div className="container">
    <div className="row row-col-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
      <div className="col-md-6 mb-3">
        <div className="card">
          

          

          <div className="card-header">
            <h5 className="text-center">Modificar ProfileUser</h5>
          </div>
          <div className="card-body">
            <form action="/profiles/profileUpdated" method="POST">
              <input type="hidden" name="method" defaultValue="PUT" />
              <label htmlFor="idProfile">
                ¿Qué id tiene el Profile que quieres modificar?
              </label>
              <input
                type="number"
                id="idProfile"
                name="idProfile"
                required=""
              />
              <br />
              <br />
              <label htmlFor="name">¿Qué nombre deseas poner?</label>
              <input type="text" class ="form-control mb-3" name="name" required="" />
              <br />
              <br />
              <label htmlFor="pin">¿Quieres cambiar la contraseña?</label>
              <input type="number" class ="form-control mb-3" name="pin" required="" />
              <br />
              <br />
              <label htmlFor="idLanguage">¿A qué idioma quieres cambiar?</label>
              <input type="number" class ="form-control mb-3" name="idLanguage" />
              <br />
              <br />
              <button className="btn btn-primary" type="submit">
                {" "}
                Guardar{" "}
              </button>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  </div>

  {profiles}


    </>
    
  )
}
