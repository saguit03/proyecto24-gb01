import React, { useState } from 'react';
import seriesService from '../../Controller/seriesController';
import { useNavigate } from 'react-router-dom';

export default function AddSeriesForm () {
  // Estado para almacenar los valores del formulario
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    isSuscription: 'True',  // Valor por defecto
    seasons: [],
    urlTitlePage: '',
    releaseDate: '',
    synopsis: '',
    description: '',
    language: [],
    category: [],
    character: [],
    participant: [],
    trailer: '',
  });

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
      const response = await seriesService.addSeries(formData);
      // Manejar la respuesta aquí
      alert('Pelicula añadida con éxito');
      navigate("/app/search")
    } catch (error) {
      console.error('Error al añadir la serie:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Añadir serie</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <p>Nota: Los parámetros con * son obligatorios</p>

          <span>Título*</span>
          <input
            type="text"
            className="form-control mb-3"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <br />

          <span>Duración (en minutos)*</span>
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
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

          <p>Temporadas</p>
          <input
            type="number"
            min="1"
            name="seasons[]"
            placeholder="idSeason 1"
            onChange={handleChange}
          />
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

          <span>URL de la portada de la película</span>
          <input
            type="url"
            className="form-control mb-3"
            name="urlTitlePage"
            value={formData.urlTitlePage}
            onChange={handleChange}
          />
          <br />

          <span>Fecha de estreno</span>
          <input
            type="date"
            className="form-control mb-3"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
          <br />

          <span>Sinopsis de la película</span>
          <input
            type="text"
            className="form-control mb-3"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
          />
          <br />

          <span>Descripción de la película</span>
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

          <span>Tráiler</span>
          <input
            type="number"
            name="trailer"
            min="1"
            placeholder="idTrailer 1"
            onChange={handleChange}
          />
          <br />

          <button className="btn btn-primary" type="submit">
            Añadir
          </button>
        </form>
      </div>
    </div>
  );
};
