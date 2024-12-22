import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import moviesService from '../../Controller/movieController'
import ListCardCategory from '../../Components/Categories/ListCardCategory'
import ListCardParticipants from '../../Components/Participants/ListCardParticipants'
import Loading from '../../Components/Loading'
import CardAddFavorites from '../../Components/Favorites/CardAddFavorites'
import ListCardReview from '../../Components/Reviews/ListCardReview'
import FormCreateReview from '../../Components/Reviews/FormCreateReview'
import contentType from '../../Config/constantesComunes'
import reviewsService from '../../Controller/reviewController'

export default function MovieInfo() {
    const params = useParams()
    const [movie, setMovie] = useState({})
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const id = params.idMovie 

    useEffect(()=>{
        moviesService.getMovieById(id).then((response)=>{
            setMovie(response[0])
            reviewsService.getReviewsByContentId(response[0].idMovie).then((response)=>{

              setReviews(response)
            })

        }).finally(()=> setLoading(false))
    },[id])
  return (
    <>
    {loading? <Loading/> : 
    <>
    <main>
    <h1>{movie.title}</h1>
        <aside className="left-aside">

            <img src={movie.urlTitlePage} alt={`Portada de ${movie.title}`} />
            <p>¿Es necesario suscripcion?: {movie.isSubscription ? 'Si' : 'No'}</p>
            <p>Fecha de salida: {movie.releaseDate}</p>

            <div className="card-content">
              <CardAddFavorites content={movie.idMovie} />
            </div>

        </aside>
        <div className="right-aside">
          <section className='card-content sinopsis'>
            <ListCardCategory listCategories={movie.categories}/>
            <p>{movie.synopsis}</p>
            <p>Duracion: {movie.duration}</p>

            


          </section>

          <section className='card-content characters'>
            <ListCardParticipants listParticipants={movie.participants}/>
          </section>
          <section className='card-content video'>
            <NavLink to={`/app/play/movie/${movie.idMovie}`}> Ver pelicula </NavLink>

            <iframe src={`${movie.trailer}`} frameborder="0"></iframe>
          </section>

          <section className='card-content reviews'>
                          <ListCardReview listReviews={reviews}/>
          
                          <FormCreateReview idContent={movie.idMovie} typeContent={contentType.MOVIE_TYPE}/>
                      </section>
        </div>
    </main>
    </>}
    
    </>
  )
}
