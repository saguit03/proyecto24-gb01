import React from 'react'
import CardMovie from './CardMovie'

export default function ListCardMovie({listMovies}) {
  return (
    <div className="mt-4">
                    <h4>Lista de Películas</h4>
                    <div className="list-group">
                        {listMovies.map((movie) => (
                            <CardMovie movie={movie}/>
                        ))}
                    </div>
                </div>
  )
}
