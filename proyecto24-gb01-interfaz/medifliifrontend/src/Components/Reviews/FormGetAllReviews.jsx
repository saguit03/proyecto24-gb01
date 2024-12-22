import React, { useState } from 'react';
import reviewsService from '../../Controller/reviewController';

export default function GetAllReviews () {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState('');

    const handleGetReviews = async () => {
        try {
            const allReviews = await reviewsService.getAllReviews();
            setReviews(allReviews);
            setMessage('');
        } catch (error) {
            setMessage('Error al obtener las reviews. Intenta nuevamente.');
            console.error('Error al obtener las reviews:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Obtener Todas las Reviews</h3>
            </div>
            <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={handleGetReviews}>
                    Buscar
                </button>
                {message && <div className="alert alert-danger">{message}</div>}
                {reviews.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Perfil</th>
                                    <th>Contenido</th>
                                    <th>Valoración</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review) => (
                                    <tr key={review.id}>
                                        <td>{review.id}</td>
                                        <td>{review.idProfile}</td>
                                        <td>{review.idContent}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.commentary || 'Sin comentario'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !message && <p>No hay reviews disponibles.</p>
                )}
            </div>
        </div>
    );
};
