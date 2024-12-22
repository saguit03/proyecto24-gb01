import React, { useState } from 'react';
import reviewsService from '../../Controller/reviewController';

export default function GetReviewsByMinRating () {
    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState('');

    // Maneja el cambio en el campo de entrada de la valoración
    const handleInputChange = (e) => {
        setRating(e.target.value);
    };

    // Maneja la búsqueda de reseñas por calificación mínima
    const handleGetReviewsByMinRating = async (e) => {
        e.preventDefault();
        try {
            const fetchedReviews = await reviewsService.getReviewsByMinRating(rating);
            if (fetchedReviews.length > 0) {
                setReviews(fetchedReviews);
                setMessage('');
            } else {
                setReviews([]);
                setMessage('No se encontraron reviews con esa valoración mínima.');
            }
        } catch (error) {
            setMessage('Error al obtener las reviews. Intenta nuevamente.');
            console.error('Error al obtener las reviews:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Búsqueda de Reviews por Valoración Mínima</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleGetReviewsByMinRating}>
                    <div className="mb-3">
                        <label htmlFor="rating">¿Sobre qué valoración mínima deseas buscar la Review?</label>
                        <input
                            type="number"
                            className="form-control"
                            name="rating"
                            value={rating}
                            onChange={handleInputChange}
                            max="10"
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {message && <div className="alert alert-danger mt-3">{message}</div>}

                {reviews.length > 0 && (
                    <div className="mt-3">
                        <h4>Reviews encontradas</h4>
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
                                        <td>{review.commentary || 'Sin comentario'}</td>
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
