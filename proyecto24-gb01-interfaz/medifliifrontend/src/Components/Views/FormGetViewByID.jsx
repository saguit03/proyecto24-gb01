import React, { useState } from 'react';
import viewsService from '../../Controller/viewController';

export default function GetViewById () {
    const [idView, setIdView] = useState('');
    const [view, setView] = useState(null);
    const [message, setMessage] = useState('');

    // Función para buscar una vista por ID
    const fetchViewById = async (e) => {
        e.preventDefault(); // Prevenir recarga de página
        setMessage(''); // Limpiar mensajes previos
        setView(null); // Limpiar la vista previa

        try {
            const response = await viewsService.getViewById(idView);
            if (response.length > 0) {
                setView(response[0]); // La API devuelve una lista; tomamos el primer elemento
                setMessage('¡Vista encontrada!');
            } else {
                setMessage('No se encontró ninguna vista con ese ID.');
            }
        } catch (error) {
            setMessage('Error al buscar la vista. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Obtener View por Id</h3>
            </div>
            <div className="card-body">
                <form onSubmit={fetchViewById}>
                    <label>¿Qué view deseas buscar?</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="idView"
                        value={idView}
                        onChange={(e) => setIdView(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {/* Mostrar mensaje de retroalimentación */}
                {message && <div className="alert alert-info mt-3">{message}</div>}

                {/* Mostrar la vista encontrada */}
                {view && (
                    <div className="mt-4">
                        <h5>Detalles de la Vista:</h5>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>ID:</strong> {view.idView}
                            </li>
                            <li className="list-group-item">
                                <strong>Fecha Inicio:</strong> {view.dateInit}
                            </li>
                            <li className="list-group-item">
                                <strong>Finalizada:</strong> {view.isFinished ? 'Sí' : 'No'}
                            </li>
                            {view.dateFinish && (
                                <li className="list-group-item">
                                    <strong>Fecha Finalización:</strong> {view.dateFinish}
                                </li>
                            )}
                            <li className="list-group-item">
                                <strong>ID Contenido:</strong> {view.idContent}
                            </li>
                            <li className="list-group-item">
                                <strong>ID Perfil:</strong> {view.idProfile}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
