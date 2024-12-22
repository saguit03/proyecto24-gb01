import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import seriesService from '../../Controller/seriesController'
import Loading from '../../Components/Loading'
import CardAddFavorites from '../../Components/Favorites/CardAddFavorites'
import ListCardCategory from '../../Components/Categories/ListCardCategory'
import ListCardParticipants from '../../Components/Participants/ListCardParticipants'
import ListCardReview from '../../Components/Reviews/ListCardReview'
import ListCardSeason from '../../Components/Seasons/ListCardSeason'
import FormCreateReview from '../../Components/Reviews/FormCreateReview'
import reviewsService from '../../Controller/reviewController'

export default function SerieInfo() {
    const params = useParams()
    const [serie, setSerie] = useState({})
    const [numSeasons, setNumSeasons] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const id = params.idSerie 

    useEffect(()=>{
        seriesService.getSeriesById(id).then((response)=>{
            setSerie(response[0])
            if(response[0].seasons){
                setNumSeasons(response[0].seasons)
            }
            console.log(response[0].idSeries)
            reviewsService.getReviewsByContentId(response[0].idSeries).then((response)=>{

              setReviews(response)
            })

        }).finally(()=> setLoading(false))
    },[id])
  return (
    <>
        {loading? <Loading/> : 
        <>
        <main>
        <h1>{serie.title}</h1>
            <aside className="left-aside">
    
                <img src={serie.urlTitlePage} alt={`Portada de ${serie.title}`} />
                <p>¿Es necesario suscripcion?: {serie.isSubscription ? 'Si' : 'No'}</p>
                <p>Fecha de salida: {serie.releaseDate}</p>

                <p>Temporada: </p>
                <select name="season" id="season">
                    {numSeasons.map((season,index)=>
                    <option key={index} value={season.seasonNumber}>{season.seasonNumber}</option>
                    )}
                </select>
    
                <div className="card-content">
                  <CardAddFavorites content={serie.idMovie} />
                </div>
    
            </aside>
            <div className="right-aside">
              <section className='card-content sinopsis'>
                <ListCardCategory listCategories={serie.categories}/>
                <p>{serie.synopsis}</p>
                <p>Duracion: {serie.duration}</p>
    
                
              </section>
    
              <section className='card-content characters'>
                <ListCardParticipants listParticipants={serie.participants}/>
                
              </section>
              <section className='card-content video'>
              {serie.seasons? <ListCardSeason listSeasons={serie.seasons}/> : <p>Esta serie no tiene temporadas</p>}
                
    
                <iframe title='trailer' src={`${serie.trailer}`} frameborder="0"></iframe>
              </section>
    
              <section className='card-content reviews'>
                <ListCardReview listReviews={reviews}/>

                <FormCreateReview idContent={serie.idSeries} typeContent={2}/>
              </section>
            </div>
        </main>
        </>}
        
        </>
  )
}
