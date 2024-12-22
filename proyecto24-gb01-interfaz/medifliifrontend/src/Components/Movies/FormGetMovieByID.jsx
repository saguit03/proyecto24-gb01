import React, { useState } from 'react';
import moviesServices from '../../Controller/movieController';

export default function FormGetMovieByID () {
    const [idMovie, setIdMovie] = useState('');
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setIdMovie(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMovie(null);

        try {
            // Llamada a la API para obtener la película por ID
            const response = await moviesServices.getMovieById(idMovie);

            if (response.data) {
                setMovie(response.data); // Asignar la película encontrada al estado
            } else {
                setError('No se encontró la película con ese ID.');
            }
        } catch (error) {
            console.error('Error al buscar la película:', error);
            setError('Hubo un problema al obtener la película.');
        }
    };

    return (
        <div className="card-body">
            <h3 className="text-center">Obtener película por identificador</h3>
            <form onSubmit={handleFormSubmit}>
                <p>¿Qué película deseas buscar?</p>
                <span>ID</span>
                <input
                    type="number"
                    className="form-control mb-3"
                    name="idMovie"
                    placeholder="idMovie 1"
                    required
                    min="1"
                    value={idMovie}
                    onChange={handleInputChange}
                />
                <button className="btn btn-primary" type="submit">Buscar</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {movie && (
                <div className="mt-4">
                    <h4>Detalles de la película</h4>
                    <p><strong>Título:</strong> {movie.title}</p>
                    <p><strong>Duración:</strong> {movie.duration} minutos</p>
                    <p><strong>Fecha de estreno:</strong> {movie.releaseDate}</p>
                    <p><strong>Sinopsis:</strong> {movie.synopsis}</p>
                    <p><strong>Descripción:</strong> {movie.description}</p>
                    <p><strong>Disponible con suscripción:</strong> {movie.isSuscription ? 'Sí' : 'No'}</p>
                    {/* Puedes agregar más detalles de la película si es necesario */}
                </div>
            )}
        </div>
    );
};
