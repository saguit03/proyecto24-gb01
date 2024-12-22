import React, { useState } from 'react';
import reviewsService from '../../Controller/reviewController';

export default function GetReviewById () {
    const [idReview, setIdReview] = useState('');
    const [review, setReview] = useState(null);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setIdReview(e.target.value);
    };

    const handleGetReviewById = async (e) => {
        e.preventDefault();
        try {
            const fetchedReview = await reviewsService.getReviewById(idReview);
            if (fetchedReview) {
                setReview(fetchedReview);
                setMessage('');
            } else {
                setReview(null);
                setMessage('No se encontró una review con ese ID.');
            }
        } catch (error) {
            setMessage('Error al obtener la review. Intenta nuevamente.');
            console.error('Error al obtener la review:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="text-center">Obtener Review por Id</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleGetReviewById}>
                    <div className="mb-3">
                        <label htmlFor="idReview">¿Qué Review deseas buscar?</label>
                        <input
                            type="number"
                            className="form-control"
                            name="idReview"
                            value={idReview}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </form>

                {message && <div className="alert alert-danger mt-3">{message}</div>}

                {review && (
                    <div className="mt-3">
                        <h4>Detalles de la Review</h4>
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
                                <tr>
                                    <td>{review.id}</td>
                                    <td>{review.idProfile}</td>
                                    <td>{review.idContent}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.commentary || 'Sin comentario'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
