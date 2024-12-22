import React from 'react'
import CardSearchMovie from './CardSearchMovie'

export default function ListSearchMovie({listMovies}) {
  return (
      <div className="mt-4">
                      <h4>Lista de Películas</h4>
                      <div className="list-group">
                          {listMovies.map((movie) => (
                              <CardSearchMovie movie={movie}/>
                          ))}
                      </div>
                  </div>
    )
}
