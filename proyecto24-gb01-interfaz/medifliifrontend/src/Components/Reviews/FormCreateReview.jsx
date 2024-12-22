import React, { useContext, useState } from 'react';
import reviewsService from '../../Controller/reviewController';
import ProfileContext from '../../context/ProfileContext';
import contentType from '../../Config/constantesComunes';
import { useNavigate } from 'react-router-dom';

export default function FormCreateReview ({idContent, typeContent}) {
    const navigate = useNavigate()
    const {profile, setProfile} = useContext(ProfileContext)
    const [review, setReview] = useState({
        idProfile: profile['id-profile'],
        // idContent: (typeContent === contentType.MOVIE_TYPE.valueOf())? content.idMovie: content.idSeries,
        idContent: idContent,
        rating: '',
        commentary: '',
        contentType : (typeContent === contentType.MOVIE_TYPE.valueOf())? 1: 2
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({
            ...review,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(review)
            reviewsService.addReview(review).then((response)=>{
                console.log(response);
                setMessage('Review añadida exitosamente.');
                navigate(`/app/serie/${idContent}`)
                setReview({
                    idProfile: '',
                    idContent: '',
                    rating: '',
                    commentary: '',
                    contentType : (typeContent === contentType.MOVIE_TYPE.valueOf())? 1: 2
            });
            }).catch((error)=>{
                setMessage('Error al añadir la review. Intenta nuevamente.');
                console.error('Error al añadir la review:', error);
            })
            
       
    };

    return (
        <div className="card">
            <div className="card-body">
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    {/* <label>¿Desde qué perfil estás creando la Review?</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="idProfile"
                        value={review.idProfile}
                        onChange={handleInputChange}
                        required
                    />
                    <label>¿De qué contenido quieres hacer la Review?</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="idContent"
                        value={review.idContent}
                        onChange={handleInputChange}
                        required
                    /> */}
                    <label>¿Qué valoración le pones?</label>
                    <input
                        type="number"
                        className="form-control mb-3"
                        name="rating"
                        min="1"
                        max="10"
                        value={review.rating}
                        onChange={handleInputChange}
                        required
                    />
                    <label>¿Quieres añadir un comentario?</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="commentary"
                        value={review.commentary}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-primary" type="submit">
                        Añadir
                    </button>
                </form>
            </div>
        </div>
    );
};
