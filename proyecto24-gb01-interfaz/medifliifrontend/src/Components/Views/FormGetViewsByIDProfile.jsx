import React, { useState } from 'react';
import viewsService from '../../Controller/viewController';

export default function GetViewsByIdProfile () {
    const [idProfile, setIdProfile] = useState('');
    const [views, setViews] = useState([]);
    const [message, setMessage] = useState('');

    // Función para buscar vistas por idProfile
    const fetchViewsByIdProfile = async (e) => {
        e.preventDefault(); // Prevenir recarga de página
        setMessage(''); // Limpiar mensajes previos
        setViews([]); // Limpiar resultados previos

        try {
            const response = await viewsService.getViewsByIdProfile(idProfile);
            if (response.length > 0) {
                setViews(response); // Actualizar vistas encontradas
                setMessage('¡Vistas encontradas!');
            } else {
                setMessage('No se encontraron vistas relacionadas con este perfil.');
            }
        } catch (error) {
            setMessage('Error al buscar las vistas. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Buscar Views por Perfil</h3>
            </div>
            <div className="card-body">
                <form onSubmit={fetchViewsByIdProfile}>
                    <label>¿Sobre qué perfil deseas buscar la View?</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="idProfile"
                        value={idProfile}
                        onChange={(e) => setIdProfile(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {/* Mostrar mensaje de retroalimentación */}
                {message && <div className="alert alert-info mt-3">{message}</div>}

                {/* Mostrar resultados */}
                {views.length > 0 && (
                    <div className="mt-4">
                        <h5>Resultados de la Búsqueda:</h5>
                        <ul className="list-group">
                            {views.map((view) => (
                                <li key={view.idView} className="list-group-item">
                                    <strong>ID View:</strong> {view.idView} <br />
                                    <strong>Fecha Inicio:</strong> {view.dateInit} <br />
                                    <strong>Finalizada:</strong> {view.isFinished ? 'Sí' : 'No'} <br />
                                    {view.dateFinish && (
                                        <>
                                            <strong>Fecha Finalización:</strong> {view.dateFinish} <br />
                                        </>
                                    )}
                                    <strong>ID Contenido:</strong> {view.idContent}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
