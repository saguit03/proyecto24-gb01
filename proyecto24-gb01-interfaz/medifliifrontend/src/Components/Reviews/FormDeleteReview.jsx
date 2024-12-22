import React, { useState } from 'react';
import reviewsService from '../../Controller/reviewController';

export default function DeleteReview () {
    const [reviewId, setReviewId] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setReviewId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reviewId) {
            setMessage('Por favor, ingresa un ID válido.');
            return;
        }

        try {
            await reviewsService.deleteReview(reviewId);
            setMessage('Review eliminada exitosamente.');
            setReviewId(''); // Resetea el campo de ID después de eliminar
        } catch (error) {
            setMessage('Error al eliminar la review. Intenta nuevamente.');
            console.error('Error al eliminar la review:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="text-center">Borrar Review</h5>
            </div>
            <div className="card-body">
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="idReview">¿Qué id tiene la Review que deseas borrar?</label>
                    <input
                        type="number"
                        id="idReview"
                        name="idReview"
                        value={reviewId}
                        onChange={handleInputChange}
                        className="form-control mb-3"
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        Borrar
                    </button>
                </form>
            </div>
        </div>
    );
};
