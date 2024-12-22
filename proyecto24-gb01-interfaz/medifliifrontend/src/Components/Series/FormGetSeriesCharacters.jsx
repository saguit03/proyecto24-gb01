import React, { useState } from 'react';
import seriesService from '../../Controller/seriesController';

export default function SearchSeriesCharacters () {
  // Estado para almacenar el ID de la serie, los personajes y el error
  const [idSeries, setIdSeries] = useState('');
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState(null);

  // Manejar el cambio en el campo de entrada (ID de la serie)
  const handleIdChange = (e) => {
    setIdSeries(e.target.value);
  };

  // Función para obtener los personajes de una serie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await seriesService.getSeriesCharacters(idSeries);
      setCharacters(response.data);
      setError(null); // Resetear errores previos
    } catch (err) {
      setError('No se pudieron obtener los personajes de la serie.');
      setCharacters(null);
    }
  };

  return (
    <div className="card">
      <h3 className="text-center">Obtener personajes de una serie</h3>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <label>ID</label>
          <input
            type="text"
            className="form-control mb-3"
            name="idSeries"
            min="1"
            placeholder="idSeries 1"
            required
            value={idSeries}
            onChange={handleIdChange}
          />
          <button className="btn btn-primary" type="submit">Buscar</button>
        </form>

        {/* Mostrar el error si ocurrió algún problema al obtener los personajes */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Mostrar los personajes si se obtienen datos */}
        {characters && (
          <div className="mt-3">
            <h4>Personajes de la Serie</h4>
            <ul>
              {characters.map((character) => (
                <li key={character.idCharacter}>
                  <strong>{character.name}</strong> - {character.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
