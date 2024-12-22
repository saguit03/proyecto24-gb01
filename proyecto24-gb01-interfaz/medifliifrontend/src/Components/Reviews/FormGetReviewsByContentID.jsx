import React, { useState } from 'react';
import reviewsService from '../../Controller/reviewController';

export default function GetReviewsByContent () {
    const [idContent, setIdContent] = useState('');
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setIdContent(e.target.value);
    };

    const handleGetReviewsByContent = async (e) => {
        e.preventDefault();
        try {
            const fetchedReviews = await reviewsService.getReviewsByContentId(idContent);
            if (fetchedReviews.length > 0) {
                setReviews(fetchedReviews);
                setMessage('');
            } else {
                setReviews([]);
                setMessage('No se encontraron reviews para este contenido.');
            }
        } catch (error) {
            setMessage('Error al obtener las reviews. Intenta nuevamente.');
            console.error('Error al obtener las reviews:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Resto de búsquedas de reviews</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleGetReviewsByContent}>
                    <div className="mb-3">
                        <label htmlFor="idContent">¿Sobre qué contenido deseas buscar la Review?</label>
                        <input
                            type="number"
                            className="form-control"
                            name="idContent"
                            value={idContent}
                            onChange={handleInputChange}
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
                )}
            </div>
        </div>
    );
};
