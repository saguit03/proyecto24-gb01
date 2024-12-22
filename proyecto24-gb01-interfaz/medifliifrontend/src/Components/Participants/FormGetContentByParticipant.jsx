import React, { useState } from 'react';
import participantsService from '../../Controller/participantController';

export default function FormGetContentByParticipant () {
  const [idParticipant, setIdParticipant] = useState('');
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    if (!idParticipant || idParticipant <= 0) {
      setError('Por favor, ingresa un ID de participante válido.');
      return;
    }

    try {
      const response = await participantsService.getContentByParticipant(idParticipant);
      if (response && response.length > 0) {
        setContent(response);
        setError('');
      } else {
        setContent(null);
        setError('No se encontró contenido para este participante.');
      }
    } catch (err) {
      setError('Error al buscar contenido. Por favor, inténtalo de nuevo más tarde.');
      setContent(null);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-center">Obtener contenido por participante</h3>
        <form onSubmit={handleSearch}>
          <label>ID</label>
          <input
            type="number"
            min="1"
            className="form-control mb-3"
            name="idParticipant"
            value={idParticipant}
            onChange={(e) => setIdParticipant(e.target.value)}
            required
            placeholder="idParticipant 1"
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </form>

        {/* Mostrar contenido relacionado */}
        {content && content.length > 0 && (
          <div className="mt-3">
            <h5>Contenido relacionado:</h5>
            <ul className="list-group">
              {content.map((item, index) => (
                <li key={index} className="list-group-item">
                  {/* Mostrar el contenido relacionado */}
                  {item.content || 'Contenido no disponible'}
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
