import React, { useState } from 'react';
import moviesServices from '../../Controller/movieController';

export default function  FormGetMovieByReleaseDate () {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    const handleInputChange = (e) => {
        setReleaseDate(e.target.value); // Captura la fecha ingresada por el usuario
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMovies([]);

        try {
            // Llamar a la función getMovieByReleaseDate pasando la fecha ingresada
            const movieData = await moviesServices.getMovieByReleaseDate(releaseDate);

            if (movieData && movieData.length > 0) {
                setMovies(movieData); // Si se encuentran películas, las guardamos en el estado
            } else {
                setError('No se encontraron películas para esa fecha de lanzamiento.');
            }
        } catch (error) {
            console.error('Error al buscar las películas:', error);
            setError('Hubo un problema al obtener las películas.');
        }
    };

    return (
        <div className="card-body">
            <h3 className="text-center">Obtener película por fecha de salida</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Fecha</label>
                <input
                    type="date"
                    className="form-control mb-3"
                    name="releaseDate"
                    required
                    value={releaseDate}
                    onChange={handleInputChange}
                />
                <button className="btn btn-primary" type="submit">Buscar</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {movies.length > 0 && (
                <div className="mt-4">
                    <h4>Películas Encontradas</h4>
                    {movies.map((movie) => (
                        <div key={movie.id} className="card mb-3">
                            <div className="card-body">
                                <h5>{movie.title}</h5>
                                <p><strong>Duración:</strong> {movie.duration} minutos</p>
                                <p><strong>Fecha de estreno:</strong> {movie.releaseDate}</p>
                                <p><strong>Sinopsis:</strong> {movie.synopsis}</p>
                                {/* Puedes agregar más detalles si lo deseas */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
