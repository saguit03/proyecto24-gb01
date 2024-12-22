import React from 'react'
import CardSearchSerie from './CardSearchSerie'

export default function ListCardSeries({listSeries}) {
  return (
        <div className="mt-4">
                        <h4>Lista de Series</h4>
                        <div className="list-group">
                            {listSeries.map((serie) => (
                                <CardSearchSerie serie={serie}/>
                            ))}
                        </div>
                    </div>
      )
}
