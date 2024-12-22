import React, { useState } from 'react';
import seriesService from '../../Controller/seriesController';

export default function AllSeries () {
  // Estado para almacenar los datos de las series y el error
  const [seriesData, setSeriesData] = useState(null);
  const [error, setError] = useState(null);

  // Función para obtener todas las series
  const handleGetAllSeries = async () => {
    try {
      const response = await seriesService.getAllSeries();
      setSeriesData(response.data);
      setError(null); // Resetear errores previos
    } catch (err) {
      setError('No se pudieron obtener las series.');
      setSeriesData(null);
    }
  };

  return (
    <div className="card-body">
      <h3 className="text-center">Obtener todas las series</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
          handleGetAllSeries();
        }}
      >
        <button className="btn btn-primary" type="submit">Buscar</button>
      </form>

      {/* Mostrar el error si ocurrió algún problema al obtener las series */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Mostrar los resultados de todas las series */}
      {seriesData && (
        <div className="mt-3">
          <h4>Lista de Series</h4>
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
