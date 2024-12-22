import React, { useState } from 'react';
import reviewsService from '../../Controller/reviewController';

export default function GetReviewStatsByContent () {
    const [idContent, setIdContent] = useState('');
    const [stats, setStats] = useState(null);
    const [message, setMessage] = useState('');

    // Maneja la búsqueda de estadísticas de reseñas por ID de contenido
    const handleGetReviewStats = async (e) => {
        e.preventDefault();
        if (!idContent) {
            setMessage('Por favor ingresa un ID de contenido.');
            return;
        }

        try {
            const statsData = await reviewsService.getReviewStatsByContentId(idContent);
            if (statsData) {
                setStats(statsData);
                setMessage('');
            } else {
                setStats(null);
                setMessage('No se encontraron estadísticas para este contenido.');
            }
        } catch (error) {
            setMessage('Error al obtener las estadísticas. Intenta nuevamente.');
            console.error('Error al obtener estadísticas:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Obtener Estadísticas de Reviews</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleGetReviewStats}>
                    <div className="mb-3">
                        <label>¿Sobre qué contenido deseas buscar la Review?</label>
                        <input
                            type="number"
                            className="form-control mb-3"
                            name="idContent"
                            value={idContent}
                            onChange={(e) => setIdContent(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {message && <div className="alert alert-danger mt-3">{message}</div>}

                {stats && (
                    <div className="mt-3">
                        <h4>Estadísticas de Reviews para el Contenido {idContent}</h4>
                        <ul>
                            <li><strong>Total de Reviews:</strong> {stats.totalReviews}</li>
                            <li><strong>Promedio de Valoración:</strong> {stats.averageRating}</li>
                            <li><strong>Valoraciones más altas:</strong> {stats.highestRating}</li>
                            <li><strong>Valoraciones más bajas:</strong> {stats.lowestRating}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
