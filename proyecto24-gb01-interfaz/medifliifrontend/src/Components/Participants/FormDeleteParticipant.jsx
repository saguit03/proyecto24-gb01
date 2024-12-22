import React, { useState } from 'react';
import participantsService from '../../Controller/participantController';

export default function FormDeleteParticipant () {
  const [idParticipant, setIdParticipant] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setIdParticipant(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idParticipant) {
      setError('El identificador del participante es obligatorio.');
      return;
    }

    try {
      const response = await participantsService.deleteParticipant(idParticipant);
      if (response.success) {
        setMessage('Participante eliminado exitosamente');
        setError('');
      } else {
        setMessage('');
        setError('Error al eliminar participante. Inténtalo nuevamente.');
      }
    } catch (err) {
      setMessage('');
      setError('Hubo un error al procesar la solicitud.');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Borrar participante</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_method" value="DELETE" />

          <span>Identificador</span>
          <input
            type="number"
            min="1"
            className="form-control mb-3"
            name="idParticipant"
            value={idParticipant}
            onChange={handleChange}
            required
            placeholder="idParticipant 1"
          />
          <br />

          <button className="btn btn-primary" type="submit">
            Borrar
          </button>
        </form>

        {/* Mensajes de éxito o error */}
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};
