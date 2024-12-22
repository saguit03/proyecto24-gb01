import React, { useState } from 'react';
import participantsService from '../../Controller/participantController';

export default function FormGetAllParticipants () {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  const handleFetchParticipants = async () => {
    try {
      const response = await participantsService.getAllParticipants();
      if (response && response.length > 0) {
        setParticipants(response);
        setError('');
      } else {
        setParticipants([]);
        setError('No se encontraron participantes.');
      }
    } catch (err) {
      setError('Error al obtener los participantes. Por favor, inténtalo de nuevo más tarde.');
      setParticipants([]);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Obtener todos los participantes</h3>
      </div>
      <div className="card-body">
        <button className="btn btn-primary mb-3" onClick={handleFetchParticipants}>
          Buscar
        </button>

        {/* Mostrar lista de participantes */}
        {participants.length > 0 && (
          <div className="mt-3">
            <h5>Lista de participantes:</h5>
            <ul className="list-group">
              {participants.map((participant) => (
                <li key={participant.idParticipant} className="list-group-item">
                  <strong>ID:</strong> {participant.idParticipant},
                  <strong> Nombre:</strong> {participant.name},
                  <strong> Apellidos:</strong> {participant.surname || 'No especificado'},
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
