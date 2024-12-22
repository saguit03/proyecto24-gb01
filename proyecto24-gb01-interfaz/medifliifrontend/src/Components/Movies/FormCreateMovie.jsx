import React, { useState } from 'react';
import moviesServices from '../../Controller/movieController';
import { useNavigate } from 'react-router-dom';

export default function FormCreateMovie () {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        title: '',
        duration: '',
        urlVideo: '',
        urlTitlePage: '',
        releaseDate: '',
        synopsis: '',
        description: '',
        isSuscription: 'False',
        language: [],
        category: [],
        character: [],
        participant: [],
        trailer: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleArrayInputChange = (e, field) => {
        const { value } = e.target;
        setMovieData(prevState => ({
            ...prevState,
            [field]: [...prevState[field], value]
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        
            const formData = new URLSearchParams();
            formData.append("title", e.target.title.value);
            formData.append("duration", e.target.duration.value);
            formData.append("urlVideo", e.target.urlVideo.value);
            formData.append("urlTitlePage", e.target.urlTitlePage.value);
            formData.append("releaseDate", e.target.releaseDate.value);
            formData.append("synopsis", e.target.synopsis.value);
            formData.append("description", e.target.description.value);
            // formData.append("language[]", e.target.language.value);
            // formData.append("category[]", e.target.category.value);
            // formData.append("character[]", e.target.character.value);
            // formData.append("participant[]", e.target.participant.value);
            formData.append("trailer", e.target.trailer.value);
            formData.append("isSuscription", e.target.isSuscription.value);
            
            console.log(formData.toString())
            moviesServices.addMovie(formData).then((response)=>{
                alert('Pelicula añadida con éxito');
                navigate("/app/search")
            }).catch((er)=>{
                console.error('Error al añadir la película:', er);
                alert('Hubo un problema al añadir la película.');
            })

            
    }

    return (
        <div className="card">
            <h3 className="text-center">Añadir película</h3>
            <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                    <p>Nota: Los parámetros con * son obligatorios</p>

                    <span>¿Cuál es el título de la película?*</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="title"
                        value={movieData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <br />

                    <span>¿Cuál es la duración (en minutos) de la película?*</span>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="duration"
                        value={movieData.duration}
                        onChange={handleInputChange}
                        required
                    />
                    <br />

                    <span>¿Cuál es la URL de la película?</span>
                    <input
                        type="url"
                        className="form-control mb-3"
                        name="urlVideo"
                        value={movieData.urlVideo}
                        onChange={handleInputChange}
                    />
                    <br />

                    <span>¿Cuál es la URL de la portada de la película?</span>
                    <input
                        type="url"
                        className="form-control mb-3"
                        name="urlTitlePage"
                        value={movieData.urlTitlePage}
                        onChange={handleInputChange}
                    />
                    <br />

                    <span>¿Cuál es la fecha de estreno?</span>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="releaseDate"
                        value={movieData.releaseDate}
                        onChange={handleInputChange}
                    />
                    <br />

                    <span>¿Cuál es la sinopsis de la película?</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="synopsis"
                        value={movieData.synopsis}
                        onChange={handleInputChange}
                    />
                    <br />

                    <span>¿Cuál es la descripción de la película?</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="description"
                        value={movieData.description}
                        onChange={handleInputChange}
                    />

                    <p>¿Disponible con suscripción?</p>
                    <input
                        type="radio"
                        id="yes"
                        name="isSuscription"
                        value="True"
                        checked={movieData.isSuscription === 'True'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="yes">Sí</label><br />
                    <input
                        type="radio"
                        id="no"
                        name="isSuscription"
                        value="False"
                        checked={movieData.isSuscription === 'False'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="no">No</label><br />

                    <p>¿Para qué idiomas está disponible?</p>
                    <input
                        type="number"
                        min="1"
                        name="language[]"
                        placeholder="idLanguage 1"
                        onBlur={(e) => handleArrayInputChange(e, 'language')}
                    />
                    <br />

                    <p>¿Qué categorías tiene asociadas?</p>
                    <input
                        type="number"
                        min="1"
                        name="category[]"
                        placeholder="idCategory 1"
                        onBlur={(e) => handleArrayInputChange(e, 'category')}
                    />
                    <br />

                    <p>¿Qué personajes principales forman parte de la película?</p>
                    <input
                        type="number"
                        min="1"
                        name="character[]"
                        placeholder="idCharacter 1"
                        onBlur={(e) => handleArrayInputChange(e, 'character')}
                    />
                    <br />

                    <p>¿Quiénes son sus intérpretes?</p>
                    <input
                        type="number"
                        min="1"
                        name="participant[]"
                        placeholder="idParticipant 1"
                        onBlur={(e) => handleArrayInputChange(e, 'participant')}
                    />
                    <br />

                    <span>¿Qué tráiler se adjunta?</span>
                    <input
                        type="number"
                        name="trailer"
                        min="1"
                        placeholder="idTrailer 1"
                        onChange={handleInputChange}
                    />
                    <br />

                    <button className="btn btn-primary" type="submit"> Añadir </button>
                </form>
            </div>
        </div>
    );
};
