import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import moviesService from '../Controller/movieController'
import ListCardMovie from '../Components/Movies/ListCardMovie'
import Loading from '../Components/Loading'
import ListSearchMovie from '../Components/Movies/ListSearchMovie'
import ListCardSeries from '../Components/Series/ListCardSeries'
import seriesService from '../Controller/seriesController'

export default function Searchs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const title = searchParams.get('title')
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMovie, setErrorMovie] = useState('');
    const [errorSerie, setErrorSerie] = useState('');
    useEffect(()=>{
        if(title){
            setLoading(true)
            console.log(title)
            moviesService.getMovieByTitle(title)
            .then(response => {
                console.log(response)
                if(errorMovie){
                    setErrorMovie('')
                }
                setMovies(response)
            })
            .catch(err => {
                console.log(err)
                if(err.status === 404){
                    setErrorMovie("Película no encontrada")
                }
                
                })
            seriesService.getSeriesByTitle(title).then((response)=>{
                console.log(response)
                if(errorSerie){
                    setErrorSerie('')
                }
                setSeries(response)
            }).catch(err => {
                console.log(err)
                if(err.status === 404){
                    setErrorSerie("Serie no encontrada")
                }
                
                })
            
        }
        setLoading(false)
    },[title])
  return (
    <>
        {loading? <Loading/> :
        <>
            {errorMovie? <p>{errorMovie}</p> :
            <>
            <ListSearchMovie listMovies={movies}/>
            
            </>
            }
            {errorSerie? <p>{errorSerie}</p> :
            <ListCardSeries listSeries={series}/>
                }
        </>
            
        }
        
    </>
  )
}
