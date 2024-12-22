import React, { useState } from 'react';
import participantsService from '../../Controller/participantController';

export default function FormGetParticipantByAge () {
  const [age, setAge] = useState('');
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    if (!age || age < 0) {
      setError('Por favor, ingresa una edad válida.');
      return;
    }

    try {
      const response = await participantsService.getParticipantByAge(age);
      if (response && response.length > 0) {
        setParticipants(response);
        setError('');
      } else {
        setParticipants([]);
        setError('No se encontraron participantes con esa edad.');
      }
    } catch (err) {
      setError('Error al buscar participantes. Por favor, inténtalo de nuevo más tarde.');
      setParticipants([]);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Obtener participantes por edad</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSearch}>
          <label>Edad</label>
          <input
            type="number"
            className="form-control mb-3"
            min="0"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </form>

        {/* Mostrar lista de participantes */}
        {participants.length > 0 && (
          <div className="mt-3">
            <h5>Resultados de la búsqueda:</h5>
            <ul className="list-group">
              {participants.map((participant) => (
                <li key={participant.idParticipant} className="list-group-item">
                  <strong>ID:</strong> {participant.idParticipant},
                  <strong> Nombre:</strong> {participant.name},
                  <strong> Apellidos:</strong> {participant.surname},
                  <strong> Edad:</strong> {participant.age},
                  <strong> Nacionalidad:</strong> {participant.nationality || 'No especificada'}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mostrar error si ocurre */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};
