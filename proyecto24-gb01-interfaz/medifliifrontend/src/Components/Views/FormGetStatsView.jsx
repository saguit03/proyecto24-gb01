import React, { useState } from 'react';
import viewsService from '../../Controller/viewController';

export default function GetStatsView () {
    const [idContent, setIdContent] = useState('');
    const [stats, setStats] = useState(null);
    const [message, setMessage] = useState('');

    // Función para buscar estadísticas de vistas
    const fetchStatsView = async (e) => {
        e.preventDefault(); // Prevenir recarga de página
        setMessage(''); // Limpiar mensajes previos
        setStats(null); // Limpiar estadísticas previas

        try {
            const response = await viewsService.getStatsView(idContent);
            if (response !== null) {
                setStats(response); // Actualizar estadísticas encontradas
                setMessage(`Estadísticas encontradas: Total de vistas: ${response}`);
            } else {
                setMessage('No se encontraron estadísticas para este contenido.');
            }
        } catch (error) {
            setMessage('Error al buscar las estadísticas. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Obtener estadísticas de Views</h3>
            </div>
            <div className="card-body">
                <form onSubmit={fetchStatsView}>
                    <label>¿Sobre qué contenido deseas buscar la View?</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="idContent"
                        value={idContent}
                        onChange={(e) => setIdContent(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {/* Mostrar mensaje de retroalimentación */}
                {message && <div className="alert alert-info mt-3">{message}</div>}

                {/* Mostrar estadísticas si están disponibles */}
                {stats !== null && (
                    <div className="mt-4">
                        <h5>Estadísticas:</h5>
                        <p>Total de vistas: {stats}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
