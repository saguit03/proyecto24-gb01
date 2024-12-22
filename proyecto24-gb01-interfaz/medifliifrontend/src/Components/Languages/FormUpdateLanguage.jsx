import React, { useState } from 'react'
import languagesService from '../../Controller/languageController';

export default function FormUpdateLanguage() {
    const[idLanguage, setIdLanguage] = useState(0)
  const [nombre, setNombre] = useState("");
    const [error, setError] = useState(null);

    const handleSubmitUpdateLanguage = async (event)=>{
        
        event.preventDefault();
        const response = await languagesService.actualizarLanguage(idLanguage,nombre).catch((error)=>{
            setError(error.message)
        })
    }
  return (
    <>
    
          <div className="card-header">
            <h5 className="text-center">Modificar Language</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmitUpdateLanguage}>
              <label htmlFor="idLanguage">
                ¿Qué id tiene el Language que quieres modificar?
              </label>
              <input
                type="number"
                id="idLanguage"
                className="form-control mb-3"
                name="idLanguage"
                onChange={(e)=>setIdLanguage(e.target.value)}
                value={idLanguage}
                required=""
              />
              <br />
              <br />
              <label htmlFor="name">¿por qué nombre deseas cambiarlo?</label>
              <input
                type="text"
                className="form-control mb-3"
                id='name'
                name="name"
                required
                onChange={(e)=> setNombre(e.target.value)}
              />
              <br />
              <br />
              <button className="btn btn-primary" type="submit">
                
                Guardar
              </button>
            </form>
          </div>
    
    </>
  )
}
