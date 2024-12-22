import React from 'react'
import UpdateButton from '../Buttons/UpdateButton'
import { useNavigate } from 'react-router-dom'
import DeleteButton from '../Buttons/DeleteButton'
import seasonsService from '../../Controller/seasonController'
import seriesService from '../../Controller/seriesController'

export default function CardSeason({season}) {
  const navigate = useNavigate()
  return (
    <div className='card-season'>
        <p>Temporada numero {season.seasonNumber}</p>
        <p>Nombre de la temporada: {season.title}</p>
        <p>Numero de capitulos: {season.totalChapters}</p>

        <UpdateButton handleFunction={()=> navigate(`/app/seasons/${season.idSeason}/update`)} componentName={"season"} />
        <DeleteButton handleFunction={()=> {
          seasonsService.deleteSeason(season.idSeason).then(res => {
            seriesService.deleteSeasonIntoSerie(season.idSeries, season.idSeason).then(res => {
              navigate(`/app/serie/${season.idSeries}`)
              })
          })
          
          }} componentName={"season"} />
    </div>
  )
}
