import React from 'react'

export default function CardMovie({movie}) {
  return (
    <li key={movie.id} className="list-group-item">
        <strong>{movie.title}</strong><br />
        <small><em>Duración:</em> {movie.duration} minutos</small><br />
        <small><em>Fecha de estreno:</em> {movie.releaseDate}</small>
        {/* Puedes agregar más detalles si lo deseas */}
    </li>
  )
}
