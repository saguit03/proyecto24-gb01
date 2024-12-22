import React, { useState } from 'react';
import seriesService from '../../Controller/seriesController';

export default function SearchSeriesByTitle () {
  // Estado para almacenar el título de la serie, los resultados y el error
  const [title, setTitle] = useState('');
  const [seriesData, setSeriesData] = useState(null);
  const [error, setError] = useState(null);

  // Manejar el cambio en el campo de entrada (Título de la serie)
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Función para obtener las series por título
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await seriesService.getSeriesByTitle(title);
      setSeriesData(response.data);
      setError(null); // Resetear errores previos
    } catch (err) {
      setError('No se pudieron obtener las series con ese título.');
      setSeriesData(null);
    }
  };

  return (
    <div className="card-body">
      <h3 className="text-center">Obtener series por título</h3>

      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input
          type="text"
          className="form-control mb-3"
          name="title"
          required
          placeholder="Stranger Things"
          value={title}
          onChange={handleTitleChange}
        />
        <button className="btn btn-primary" type="submit">Buscar</button>
      </form>

      {/* Mostrar el error si ocurrió algún problema al obtener las series */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Mostrar los resultados de las series */}
      {seriesData && (
        <div className="mt-3">
          <h4>Resultados de la Búsqueda</h4>
          <ul>
            {seriesData.map((series) => (
              <li key={series.idSeries}>
                <strong>{series.title}</strong> - {series.duration} minutos
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
