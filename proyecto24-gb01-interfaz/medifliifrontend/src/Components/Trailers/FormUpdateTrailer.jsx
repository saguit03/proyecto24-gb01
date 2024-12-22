import React, { useState } from 'react';
import trailersService from '../../Controller/trailerController';

export default function UpdateTrailer () {
    const [formData, setFormData] = useState({
        idTrailer: '',
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
            setFormData({
                ...formData,
                [fieldName]: [...formData[fieldName], value],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { idTrailer, ...updatedFields } = formData;
            const response = await trailersService.updateTrailer(idTrailer, updatedFields);
            console.log('Tráiler actualizado:', response);
            alert('¡Tráiler modificado con éxito!');
        } catch (error) {
            console.error('Error al modificar el tráiler:', error);
            alert('Hubo un error al modificar el tráiler.');
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Modificar tráiler</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_method" value="PUT" />

                    <span>ID*</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        required
                        name="idTrailer"
                        placeholder="idTrailer 1"
                        onChange={handleChange}
                    />
                    <br />

                    <span>¿Cuál es el título del tráiler?</span>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="title"
                        onChange={handleChange}
                    />
                    <br />

                    <span>¿Cuál es la duración (en minutos) del tráiler?</span>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="duration"
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
                        Modificar
                    </button>
                </form>
            </div>
        </div>
    );
};
