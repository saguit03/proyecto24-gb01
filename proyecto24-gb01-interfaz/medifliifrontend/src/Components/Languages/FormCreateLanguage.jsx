import React, { useState } from 'react'
import languagesService from '../../Controller/languageController';

export default function FormCreateLanguage() {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState(null);

    const handleSubmitPostLanguage = async (event)=>{
        
        event.preventDefault();
        const response = await languagesService.addLanguage(nombre).catch((error)=>{
            setError(error.message)
        })
    }
  return (
    <>
    
            
          
        <div className="card-body">
        <h5 className="text-center">Insertar Language</h5>
        {error? <p>{error}</p> : null}
            <form onSubmit={handleSubmitPostLanguage}>
              <label>Nombre del Language</label>
              <input
                type="text"
                className="form-control mb-3"
                name="name"
                required=""
                onChange={(e)=> setNombre(e.target.value)}
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
