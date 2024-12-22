import React from 'react'
import CardSeason from './CardSeason'

export default function ListCardSeason({listSeasons}) {
  return (
    <div className="mt-4">
                                <h4>Lista de reviews</h4>
                                <div className="list-group">
                                    {listSeasons.map((season) => (
                                        <CardSeason season={season}/>
                                    ))}
                                </div>
                            </div>
  )
}
