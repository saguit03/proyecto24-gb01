import React, { useEffect, useState } from 'react';
import reviewsService from '../../Controller/reviewController';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading';

export default function UpdateReview () {
    const params = useParams()
    const navigate = useNavigate()
        const [review, setReview] = useState({})
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
        const reviewId = params.idReview 
    const [updatedFields, setUpdatedFields] = useState({
        rating: '',
        commentary: ''
    });

    const [message, setMessage] = useState('');

    useEffect(()=>{
        reviewsService.getReviewById(reviewId).then(response =>{
            setReview(response[0])
        }).catch(err =>{
            setError(err)
        }).finally(()=> setLoading(false))
    },[reviewId])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({
            ...review,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        
            reviewsService.updateReview(reviewId, review).then(response =>{
                setMessage('Review actualizada exitosamente.');
                navigate("/app/user/mis-reviews")
            }).catch(error =>{
                setMessage('Error al actualizar la review. Intenta nuevamente.');
                console.error('Error al actualizar la review:', error);
            })
            
        
    };

    return (
        <>
        {loading? <Loading/> :
            <div className="card">
            <div className="card-header">
                <h5 className="text-center">Modificar Review</h5>
            </div>
            <div className="card-body">
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    
                    <label>¿Quieres cambiar la valoración?</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="rating"
                        min="1"
                        max="10"
                        value={review.rating}
                        onChange={handleInputChange}
                    />
                    <label>¿Quieres cambiar el comentario?</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="commentary"
                        value={review.commentary}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-primary" type="submit">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
        }
        
        </>
    );
};
