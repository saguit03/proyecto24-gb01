import React, { useState } from 'react';
import viewsService from '../../Controller/viewController';

export default function GetAllViews () {
    const [views, setViews] = useState([]);
    const [message, setMessage] = useState('');

    // Función para obtener todas las vistas
    const fetchAllViews = async () => {
        try {
            const response = await viewsService.getAllViews();
            setViews(response); // Actualizamos el estado con la lista de vistas
            setMessage('¡Vistas cargadas con éxito!');
        } catch (error) {
            setMessage('Error al obtener las vistas. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Obtener Todas las Views</h3>
            </div>
            <div className="card-body">
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevenir recarga de página
                        fetchAllViews(); // Llamamos a la función que obtiene las vistas
                    }}
                >
                    <label>Listar todas las views</label>
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {/* Mostrar mensaje de retroalimentación */}
                {message && <div className="alert alert-info mt-3">{message}</div>}

                {/* Mostrar lista de vistas si existen */}
                {views.length > 0 && (
                    <div className="mt-4">
                        <h5>Lista de Views:</h5>
                        <ul className="list-group">
                            {views.map((view) => (
                                <li key={view.idView} className="list-group-item">
                                    <strong>ID:</strong> {view.idView} -
                                    <strong> Fecha Inicio:</strong> {view.dateInit} -
                                    <strong> Fecha Fin:</strong> {view.dateFinish}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
