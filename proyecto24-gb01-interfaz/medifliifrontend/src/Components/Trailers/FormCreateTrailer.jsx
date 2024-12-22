import React, { useState } from 'react';
import trailersService from '../../Controller/trailerController';

export default function AddTrailer () {
    const [trailer, setTrailer] = useState({
        title: '',
        duration: '',
        urlVideo: '',
        language: [],
        category: [],
        character: [],
        participant: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Manejar arrays como `language[]`, `category[]`, etc.
        if (name.endsWith('[]')) {
            const fieldName = name.slice(0, -2); // Remover "[]"
            setTrailer({
                ...trailer,
                [fieldName]: [...trailer[fieldName], value],
            });
        } else {
            setTrailer({
                ...trailer,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await trailersService.addTrailer(trailer);
            console.log('Tráiler añadido:', response);
            alert('¡Tráiler añadido con éxito!');
        } catch (error) {
            console.error('Error al añadir el tráiler:', error);
            alert('Hubo un error al añadir el tráiler.');
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Añadir tráiler</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <p>Nota: Los parámetros con * son obligatorios</p>

                    <span>¿Cuál es el título del tráiler?*</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="title"
                        required
                        onChange={handleChange}
                    />
                    <br />

                    <span>¿Cuál es la duración (en minutos) del tráiler?*</span>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="duration"
                        required
                        onChange={handleChange}
                    />
                    <br />

                    <span>¿Cuál es la URL del tráiler?</span>
                    <input
                        type="url"
                        className="form-control mb-3"
                        name="urlVideo"
                        onChange={handleChange}
                    />
                    <br />

                    <p>¿Para qué idiomas está disponible?</p>
                    {[1, 2, 3].map((_, index) => (
                        <input
                            key={`language-${index}`}
                            type="number"
                            min="1"
                            name="language[]"
                            className="form-control mb-2"
                            placeholder={`idLanguage ${index + 1}`}
                            onChange={handleChange}
                        />
                    ))}
                    <br />

                    <p>¿Qué categorías tiene asociadas?</p>
                    {[1, 2].map((_, index) => (
                        <input
                            key={`category-${index}`}
                            type="number"
                            min="1"
                            name="category[]"
                            className="form-control mb-2"
                            placeholder={`idCategory ${index + 1}`}
                            onChange={handleChange}
                        />
                    ))}
                    <br />

                    <p>¿Qué personajes principales forman parte del tráiler?</p>
                    {[1, 2, 3].map((_, index) => (
                        <input
                            key={`character-${index}`}
                            type="number"
                            min="1"
                            name="character[]"
                            className="form-control mb-2"
                            placeholder={`idCharacter ${index + 1}`}
                            onChange={handleChange}
                        />
                    ))}
                    <br />

                    <p>¿Quiénes son sus intérpretes?</p>
                    {[1, 2, 3].map((_, index) => (
                        <input
                            key={`participant-${index}`}
                            type="number"
                            min="1"
                            name="participant[]"
                            className="form-control mb-2"
                            placeholder={`idParticipant ${index + 1}`}
                            onChange={handleChange}
                        />
                    ))}
                    <br />

                    <button className="btn btn-primary" type="submit">
                        Añadir
                    </button>
                </form>
            </div>
        </div>
    );
};
