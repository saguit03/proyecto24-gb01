import React, { useState } from 'react'
import languagesService from '../../Controller/languageController';

export default function FormDeleteLanguage() {
    const[idLanguage, setIdLanguage] = useState(0)
    const [error, setError] = useState(null);
    const handleDeleteLanguage = async (event)=>{
        event.preventDefault();
        languagesService.eliminarLanguageForm(idLanguage).catch((error)=>{
            setError(error.message);
        })
    }
  return (
    <>
     <div className="card-header">
            <h5 className="text-center">Borrar Language</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleDeleteLanguage}>
              <label>¿Qué id tiene el Language que deseas borrar?</label>
              <input
                type="number"
                id="idLanguage"
                className="form-control mb-3"
                name="idLanguage"
                onChange={(e)=>setIdLanguage(e.target.value)}
                value={idLanguage}
                required=""
              />
              <button className="btn btn-primary" type="submit">
                
                Borrar
              </button>
            </form>
          </div>
    </>
  )
}
