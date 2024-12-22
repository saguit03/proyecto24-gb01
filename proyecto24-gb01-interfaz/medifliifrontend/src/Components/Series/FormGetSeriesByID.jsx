import React, { useState } from 'react';
import seriesService from '../../Controller/seriesController';

export default function SearchSeriesForm () {
  // Estado para almacenar el ID de la serie y los datos obtenidos
  const [idSeries, setIdSeries] = useState('');
  const [seriesData, setSeriesData] = useState(null);
  const [error, setError] = useState(null);

  // Manejar el cambio en el campo de entrada (ID de la serie)
  const handleChange = (e) => {
    setIdSeries(e.target.value);
  };

  // Función para realizar la búsqueda de la serie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await seriesService.getSeriesById(idSeries);
      setSeriesData(response.data);
      setError(null); // Resetear errores previos
    } catch (err) {
      setError('No se pudo encontrar la serie con ese ID.');
      setSeriesData(null);
    }
  };

  return (
    <div className="card">
      <h3 className="text-center">Obtener serie por identificador</h3>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <p>¿Qué serie deseas buscar?</p>
          <span>ID</span>
          <input
            type="text"
            className="form-control mb-3"
            min="1"
            name="idSeries"
            required
            placeholder="idSeries 1"
            value={idSeries}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">Buscar</button>
        </form>

        {/* Mostrar los resultados de la búsqueda */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {seriesData && (
          <div className="mt-3">
            <h4>Detalles de la Serie</h4>
            <p><strong>ID:</strong> {seriesData.idSeries}</p>
            <p><strong>Título:</strong> {seriesData.title}</p>
            <p><strong>Duración:</strong> {seriesData.duration} minutos</p>
            <p><strong>Suscripción:</strong> {seriesData.isSuscription ? 'Sí' : 'No'}</p>
            <p><strong>Sinopsis:</strong> {seriesData.synopsis}</p>
            <p><strong>Descripción:</strong> {seriesData.description}</p>
            {/* Puedes agregar más detalles según los datos devueltos por la API */}
          </div>
        )}
      </div>
    </div>
  );
};
