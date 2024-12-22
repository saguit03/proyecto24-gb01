import React, { useState } from 'react';
import moviesServices from '../../Controller/movieController';

export default function FormGetMovieByTitle () {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');

    const handleInputChange = (e) => {
        setTitle(e.target.value); // Captura el título ingresado por el usuario
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMovie(null);

        try {
            // Llamar a la función getMovieByTitle pasando el título ingresado
            const movieData = await moviesServices.getMovieByTitle(title);

            if (movieData) {
                setMovie(movieData); // Guardamos la película obtenida
            } else {
                setError('No se encontró ninguna película con ese título.');
            }
        } catch (error) {
            console.error('Error al buscar la película:', error);
            setError('Hubo un problema al obtener la película.');
        }
    };

    return (
        <div className="card-body">
            <h3 className="text-center">Obtener película por título</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Título</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    name="title"
                    required
                    placeholder="Blade Runner"
                    value={title}
                    onChange={handleInputChange}
                />
                <button className="btn btn-primary" type="submit">Buscar</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {movie && (
                <div className="mt-4">
                    <h4>Película Encontrada</h4>
                    <div className="card">
                        <div className="card-body">
                            <h5>{movie.title}</h5>
                            <p><strong>Duración:</strong> {movie.duration} minutos</p>
                            <p><strong>Fecha de estreno:</strong> {movie.releaseDate}</p>
                            <p><strong>Sinopsis:</strong> {movie.synopsis}</p>
                            {/* Puedes agregar más detalles si lo deseas */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
