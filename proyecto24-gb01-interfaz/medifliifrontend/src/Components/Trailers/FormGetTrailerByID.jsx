import React, { useState } from 'react';
import trailersService from '../../Controller/trailerController';

export default function GetTrailerById () {
    const [idTrailer, setIdTrailer] = useState('');
    const [trailer, setTrailer] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setIdTrailer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setTrailer(null); // Reiniciar el estado antes de realizar la búsqueda
        try {
            const response = await trailersService.getTrailerById(idTrailer);
            if (response && response.length > 0) {
                setTrailer(response[0]); // Mostrar el primer resultado si hay más de uno
            } else {
                setError('No se encontró un tráiler con ese ID.');
            }
        } catch (err) {
            console.error('Error al buscar el tráiler:', err);
            setError('Hubo un error al intentar obtener el tráiler.');
        }
    };

    return (
        <div className="card-body">
            <h3 className="text-center">Obtener tráiler por identificador</h3>
            <form onSubmit={handleSubmit}>
                <p>¿Qué tráiler deseas buscar?</p>
                <span>ID</span>
                <input
                    type="number"
                    min="1"
                    className="form-control mb-3"
                    name="idTrailer"
                    required
                    placeholder="idTrailer 1"
                    value={idTrailer}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">
                    Buscar
                </button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {trailer && (
                <div className="mt-3">
                    <h4>Detalles del Tráiler</h4>
                    <p><strong>ID:</strong> {trailer.idTrailer}</p>
                    <p><strong>Título:</strong> {trailer.title}</p>
                    <p><strong>Duración:</strong> {trailer.duration} minutos</p>
                    <p><strong>URL del video:</strong> <a href={trailer.urlVideo} target="_blank" rel="noopener noreferrer">{trailer.urlVideo}</a></p>
                    <p><strong>Idiomas:</strong> {trailer.language.join(', ')}</p>
                    <p><strong>Categorías:</strong> {trailer.category.join(', ')}</p>
                    <p><strong>Personajes:</strong> {trailer.character.join(', ')}</p>
                    <p><strong>Intérpretes:</strong> {trailer.participant.join(', ')}</p>
                </div>
            )}
        </div>
    );
};
