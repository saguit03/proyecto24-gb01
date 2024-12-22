import React, { useState } from 'react';
import seriesService from '../../Controller/seriesController';

export default function DeleteSeries () {
  // Estado para el ID de la serie y mensajes de éxito o error
  const [idSeries, setIdSeries] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Manejar el cambio en el campo de entrada (ID de la serie)
  const handleIdChange = (e) => {
    setIdSeries(e.target.value);
  };

  // Función para eliminar una serie
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('idSeries', idSeries);
      

      const response = await seriesService.deleteSeries(idSeries);
      setSuccessMessage(`Serie con ID ${idSeries} eliminada con éxito.`);
      setErrorMessage(null); // Resetear mensaje de error
      setIdSeries(''); // Limpiar el campo de entrada
    } catch (err) {
      setErrorMessage('No se pudo eliminar la serie. Verifica el ID ingresado.');
      setSuccessMessage(null); // Resetear mensaje de éxito
    }
  };

  return (
    <div className="card">
      <h3 className="text-center">Eliminar serie</h3>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <label>ID</label>
          <input
            type="text"
            className="form-control mb-3"
            min="1"
            name="idSeries"
            required
            value={idSeries}
            onChange={handleIdChange}
          />
          <button className="btn btn-primary" type="submit">
            Eliminar
          </button>
        </form>

        {/* Mostrar mensaje de éxito si la eliminación fue exitosa */}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

        {/* Mostrar mensaje de error si ocurrió un problema */}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>
    </div>
  );
};
