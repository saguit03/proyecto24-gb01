import React, { useEffect, useState } from 'react';
import seriesService from '../../Controller/seriesController';
import Loading from '../Loading';
import AddButton from '../Buttons/AddButton';
import { useNavigate } from 'react-router-dom';
import ListCardSeason from '../Seasons/ListCardSeason';
import seasonsService from '../../Controller/seasonController';

export default function ModifySeriesForm () {
  const [seriesId, setSeriesId] = useState(null);
  const [serieData, setSerieData] = useState({});
  const navigate = useNavigate();
      const [error, setError] = useState(''); // Estado para manejar errores
      const [loading, setLoading] = useState(false); // Estado para manejar la carga de la página
      const [successMessage, setSuccessMessage] = useState(''); // Estado para manejar mensajes de éxito
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({});
  const [seasons, setSeasons] = useState([]);

  

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'seasons[]' || name === 'language[]' || name === 'category[]' || name === 'character[]' || name === 'participant[]') {
      setFormData((prevData) => {
            let updatedArray = []
            if(prevData[name]){
                updatedArray = [...prevData[name], value];
            }
            
            return {
                ...prevData,
                [name]: updatedArray
            };
        });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await seriesService.updateSeries(formData);
      // Manejar la respuesta aquí
      console.log('Serie actualizada:', response);
    } catch (error) {
      console.error('Error al actualizar la serie:', error);
    }
  };

  const handleChangeIdSerie = (e) => {
        setLoading(true)
        seriesService.getSeriesById(e.target.value).then((response)=>{
            setFormData(response[0])
            console.log(response)
        }).catch((err) => {
            setFormData({})
        })
        .finally(()=> {
            setLoading(false)
            
            })
        setSeriesId(e.target.value)
        
    };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Modificar serie</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          

          <p>Nota: Los parámetros con * son obligatorios</p>

          <label>ID*</label>
          <input
            type="text"
            className="form-control mb-3"
            name="idSeries"
            value={seriesId}
            onChange={handleChangeIdSerie}
            required
            placeholder="idSeries 1"
          />
          <br />
          {loading? <Loading/> : 
          <>
          <label>Título</label>
          <input
            type="text"
            className="form-control mb-3"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <br />

          <label>Duración (en minutos)</label>
          <input
            type="number"
            className="form-control mb-3"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
          <br />

          <p>Disponible con suscripción</p>
          <input
            type="radio"
            id="yes"
            name="isSuscription"
            value="True"
            checked={formData.isSuscription === 'True'}
            onChange={handleChange}
          />
          <label htmlFor="yes">Sí</label>
          <br />
          <input
            type="radio"
            id="no"
            name="isSuscription"
            value="False"
            checked={formData.isSuscription === 'False'}
            onChange={handleChange}
          />
          <label htmlFor="no">No</label>
          <br />

          {/* <p>Temporadas</p>
          <input
            type="number"
            min="1"
            name="seasons[]"
            placeholder="idSeason 1"
            onChange={handleChange}
          /> */}
          {formData.seasons? <ListCardSeason listSeasons={formData.seasons} /> : <p>No existe ninguna temporada</p>}
          
          <AddButton handleFunction={()=> navigate(`/app/serie/${formData.idSeries}/addSeason`)} componentName={"season"} />
          <br />
          <input
            type="number"
            min="1"
            name="seasons[]"
            placeholder="idSeason 2"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="seasons[]"
            placeholder="idSeason 3"
            onChange={handleChange}
          />
          <br />

          <label>URL de la portada de la película (Opcional)</label>
          <input
            type="url"
            className="form-control mb-3"
            name="urlTitlePage"
            value={formData.urlTitlePage}
            onChange={handleChange}
          />
          <br />

          <label>Fecha de estreno (Opcional)</label>
          <input
            type="date"
            className="form-control mb-3"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
          <br />

          <label>Sinopsis de la película (Opcional)</label>
          <input
            type="text"
            className="form-control mb-3"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
          />
          <br />

          <label>Descripción de la película (Opcional)</label>
          <input
            type="text"
            className="form-control mb-3"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <br />

          <p>Idiomas disponibles</p>
          <input
            type="number"
            min="1"
            name="language[]"
            placeholder="idLanguage 1"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="language[]"
            placeholder="idLanguage 2"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="language[]"
            placeholder="idLanguage 3"
            onChange={handleChange}
          />
          <br />

          <p>Categorías asociadas</p>
          <input
            type="number"
            min="1"
            name="category[]"
            placeholder="idCategory 1"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="category[]"
            placeholder="idCategory 2"
            onChange={handleChange}
          />
          <br />

          <p>Personajes</p>
          <input
            type="number"
            min="1"
            name="character[]"
            placeholder="idCharacter 1"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="character[]"
            placeholder="idCharacter 2"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="character[]"
            placeholder="idCharacter 3"
            onChange={handleChange}
          />
          <br />

          <p>Intérpretes</p>
          <input
            type="number"
            min="1"
            name="participant[]"
            placeholder="idParticipant 1"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="participant[]"
            placeholder="idParticipant 2"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="1"
            name="participant[]"
            placeholder="idParticipant 3"
            onChange={handleChange}
          />
          <br />

          <label>Tráiler</label>
          <input
            type="number"
            name="trailer"
            min="1"
            placeholder="idTrailer 1"
            onChange={handleChange}
          />
          <br />

          <button className="btn btn-primary" type="submit">
            Actualizar
          </button>
          </>
          }
          
        </form>
      </div>
    </div>
  );
};
