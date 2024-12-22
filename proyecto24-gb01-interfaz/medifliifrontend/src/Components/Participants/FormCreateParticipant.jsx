import React, { useState } from 'react';
import participantsService from '../../Controller/participantController';

export default function FormCreateParticipant () {
  const [participant, setParticipant] = useState({
    name: '',
    surname: '',
    age: '',
    nationality: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant({ ...participant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada al servicio para añadir el participante
      await participantsService.addParticipant(participant);
      setSuccessMessage('Participante añadido con éxito');
      setError('');
      setParticipant({ name: '', surname: '', age: '', nationality: '' }); // Reiniciar el formulario
    } catch (err) {
      setError('Error al añadir el participante. Por favor, revisa los datos.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Añadir participante</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <p>Nota: Los parámetros con * son obligatorios</p>

          <span>Nombre*</span>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            value={participant.name}
            onChange={handleChange}
            required
          />
          <br />

          <span>Apellidos</span>
          <input
            type="text"
            className="form-control mb-3"
            name="surname"
            value={participant.surname}
            onChange={handleChange}
          />
          <br />

          <span>Edad*</span>
          <input
            type="number"
            className="form-control mb-3"
            name="age"
            value={participant.age}
            onChange={handleChange}
            min="0"
            required
          />
          <br />

          <span>Nacionalidad</span>
          <input
            type="text"
            className="form-control mb-3"
            name="nationality"
            value={participant.nationality}
            onChange={handleChange}
            placeholder="España"
          />
          <br />

          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </form>

        {/* Mensajes de éxito o error */}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};
