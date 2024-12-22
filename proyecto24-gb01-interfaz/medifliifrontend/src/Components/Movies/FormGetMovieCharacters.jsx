import React, { useState } from 'react';
import moviesServices from '../../Controller/movieController';

export default function FormGetMovieCharacters () {
    const [idMovie, setIdMovie] = useState('');
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setIdMovie(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCharacters([]);
        setLoading(true);

        try {
            // Llamada a la función getMovieCharacters con el ID de la película
            const data = await moviesServices.getMovieCharacters(idMovie);
            setCharacters(data);
        } catch (error) {
            console.error('Error al obtener los personajes de la película:', error);
            setError('Hubo un problema al obtener los personajes');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h3 className="text-center">Obtener personajes de película</h3>
            <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                    <label>ID</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="idMovie"
                        placeholder="idMovie 1"
                        required
                        value={idMovie}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Buscar'}
                    </button>
                </form>

                {error && <div className="alert alert-danger mt-3">{error}</div>}

                {characters.length > 0 && (
                    <div className="mt-3">
                        <h4>Personajes encontrados:</h4>
                        <ul>
                            {characters.map((character, index) => (
                                <li key={index}>{character.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
