import React, { useState } from 'react';
import participantsService from '../../Controller/participantController';

export default function FormUpdateParticipant () {
  const [formData, setFormData] = useState({
    idParticipant: '',
    name: '',
    surname: '',
    age: '',
    nationality: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.idParticipant) {
      setError('El identificador del participante es obligatorio.');
      return;
    }

    try {
      const response = await participantsService.updateParticipant(formData);
      if (response.success) {
        setMessage('Participante actualizado exitosamente');
        setError('');
      } else {
        setMessage('');
        setError('Error al actualizar participante. Inténtalo nuevamente.');
      }
    } catch (err) {
      setMessage('');
      setError('Hubo un error al procesar la solicitud.');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-center">Modificar participante</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_method" value="PUT" />

          <p>Nota: Los parámetros con * son obligatorios</p>

          <span>Identificador*</span>
          <input
            type="number"
            min="1"
            className="form-control mb-3"
            name="idParticipant"
            value={formData.idParticipant}
            onChange={handleChange}
            required
            placeholder="idParticipant 1"
          />
          <br />

          <span>Nombre</span>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />

          <span>Apellidos</span>
          <input
            type="text"
            className="form-control mb-3"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
          <br />

          <span>Edad</span>
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <br />

          <span>Nacionalidad</span>
          <input
            type="text"
            className="form-control mb-3"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="España"
          />
          <br />

          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </form>

        {/* Mensajes de éxito o error */}
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};
