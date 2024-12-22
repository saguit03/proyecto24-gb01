import React, { useEffect, useState } from 'react'
import seasonsService from '../../Controller/seasonController'
import seriesService from '../../Controller/seriesController'
import { useNavigate } from 'react-router-dom'

export default function FormAddSeasonIntoSerie() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [idSerie, setIdSerie] = useState(0)
    const [idSeason, setIdSeason] = useState(0)
    const [seasons, setSeasons] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        seriesService.putSeasonIntoSerie(idSerie,idSeason).then(response=>{
            alert("Temporada insertada con exito")
            navigate(`/app/serie/${idSerie}`)
        }).catch(err =>{
            setError(err.message)
        })
    }
  return (
    <div>

        <form action="" onSubmit={handleSubmit}>
        <label htmlFor="id-serie">Id de la serie que quieres insertar la temporada: </label>
            <input type="number" name="id-serie" id="id-serie" value={idSerie} onChange={e => setIdSerie(e.target.value)} />
        <label htmlFor="id-season">Id de la season que quieres insertar: </label>
            <input type="number" name="id-season" id="id-season" value={idSeason} onChange={e => setIdSeason(e.target.value)}/>
            <button type="submit">Insertar</button>
        </form>
        <h2>{error}</h2>
    </div>
  )
}
