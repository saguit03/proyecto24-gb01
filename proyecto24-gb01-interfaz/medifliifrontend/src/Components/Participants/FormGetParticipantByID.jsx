import React, { useState } from 'react';
import participantsService from '../../Controller/participantController';

export default function FormGetParticipantByID () {
  const [idParticipant, setIdParticipant] = useState('');
  const [participant, setParticipant] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setIdParticipant(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await participantsService.getParticipantById(idParticipant);
      if (response && response.length > 0) {
        setParticipant(response[0]); // Considera que solo devuelve un participante
        setError('');
      } else {
        setParticipant(null);
        setError('Participante no encontrado.');
      }
    } catch (err) {
      setError('Error al buscar el participante. Por favor, verifica el ID.');
      setParticipant(null);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Obtener participante por identificador</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <p>¿Qué participante deseas buscar?</p>
          <span>ID</span>
          <input
            type="number"
            className="form-control mb-3"
            name="idParticipant"
            value={idParticipant}
            onChange={handleChange}
            min="1"
            required
            placeholder="idParticipant 1"
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </form>

        {/* Mostrar resultado o error */}
        {participant && (
          <div className="mt-3">
            <h5>Detalles del participante:</h5>
            <ul>
              <li>
                <strong>ID:</strong> {participant.idParticipant}
              </li>
              <li>
                <strong>Nombre:</strong> {participant.name}
              </li>
              <li>
                <strong>Apellidos:</strong> {participant.surname || 'No especificado'}
              </li>
              <li>
                <strong>Edad:</strong> {participant.age}
              </li>
              <li>
                <strong>Nacionalidad:</strong> {participant.nationality || 'No especificada'}
              </li>
            </ul>
          </div>
        )}

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};
