import React, { useState } from 'react';
import reviewsService from '../../Controller/reviewController';

export default function GetReviewsWithoutCommentary () {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState('');

    // Maneja la búsqueda de reseñas sin comentarios
    const handleGetReviewsWithoutCommentary = async (e) => {
        e.preventDefault();
        try {
            const fetchedReviews = await reviewsService.getReviewsWithoutCommentary();
            if (fetchedReviews.length > 0) {
                setReviews(fetchedReviews);
                setMessage('');
            } else {
                setReviews([]);
                setMessage('No se encontraron reviews sin comentarios.');
            }
        } catch (error) {
            setMessage('Error al obtener las reviews sin comentarios. Intenta nuevamente.');
            console.error('Error al obtener las reviews:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Listar todas las Reviews sin Comentarios</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleGetReviewsWithoutCommentary}>
                    <div className="mb-3">
                        <label>Listar todas las valoraciones sin comentarios</label>
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {message && <div className="alert alert-danger mt-3">{message}</div>}

                {reviews.length > 0 && (
                    <div className="mt-3">
                        <h4>Reviews sin Comentarios</h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Contenido</th>
                                    <th>Valoración</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review) => (
                                    <tr key={review.id}>
                                        <td>{review.id}</td>
                                        <td>{review.idContent}</td>
                                        <td>{review.rating}</td>
                                        <td>Sin comentario</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
