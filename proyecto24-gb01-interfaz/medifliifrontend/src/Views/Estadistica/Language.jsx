import React, { useEffect, useState } from 'react'
import languagesService from '../../Controller/languageController';
import FormCreateLanguage from '../../Components/Languages/FormCreateLanguage';

export default function Language({}) {
    const [languages, setLanguages] = useState([]);
    useEffect(()=>{
        languagesService.getAllLanguages((response)=>{
            setLanguages(response)
            console.log(response)
        }).catch((error)=> console.log(error.message))
    },[])
  return (
    <>
        

  <div className="container">
    <h1 className="text-center mt-5 mb-5"> MedifliStats - Languages</h1>
  </div>
  <div className="container">
    <div className="row row-col-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
      <div className="col-md-6 mb-3">
        <div className="card">
          

          

          <div className="card-header">
            <h5 className="text-center">Modificar Language</h5>
          </div>
          <div className="card-body">
            <form action="/languages/languageUpdated" method="POST">
              <input type="hidden" name="method" defaultValue="PUT" />
              <label htmlFor="idLanguage">
                ¿Qué id tiene el Language que quieres modificar?
              </label>
              <input
                type="number"
                id="idLanguage"
                name="idLanguage"
                required=""
              />
              <br />
              <br />
              <label htmlFor="name">¿por qué nombre deseas cambiarlo?</label>
              <input type="text" id="name" name="name" required="" />
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

  {languages}


    </>
    
  )
}
