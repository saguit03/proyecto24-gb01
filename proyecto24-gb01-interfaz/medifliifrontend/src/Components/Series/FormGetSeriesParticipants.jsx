import React, { useState } from 'react';
import seriesService from '../../Controller/seriesController';

export default function SearchSeriesParticipants () {
  // Estado para almacenar el ID de la serie, los participantes y el error
  const [idSeries, setIdSeries] = useState('');
  const [participants, setParticipants] = useState(null);
  const [error, setError] = useState(null);

  // Manejar el cambio en el campo de entrada (ID de la serie)
  const handleIdChange = (e) => {
    setIdSeries(e.target.value);
  };

  // Función para obtener los participantes de una serie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await seriesService.getSeriesParticipants(idSeries);
      setParticipants(response.data);
      setError(null); // Resetear errores previos
    } catch (err) {
      setError('No se pudieron obtener los participantes de la serie.');
      setParticipants(null);
    }
  };

  return (
    <div className="card">
      <h3 className="text-center">Obtener participantes de una serie</h3>
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

        {/* Mostrar el error si ocurrió algún problema al obtener los participantes */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Mostrar los participantes si se obtienen datos */}
        {participants && (
          <div className="mt-3">
            <h4>Participantes de la Serie</h4>
            <ul>
              {participants.map((participant) => (
                <li key={participant.idParticipant}>
                  <strong>{participant.name}</strong> - {participant.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
