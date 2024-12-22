import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CardSearchMovie({movie}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/app/movie/${movie.idMovie}`);
    }
  return (
    <section key={movie.id} className="list-group-item" onClick={handleClick}>
        <strong>{movie.title}</strong><br />
        <small><em>Duración:</em> {movie.duration} minutos</small><br />
        <small><em>Fecha de estreno:</em> {movie.releaseDate}</small>
        {/* Puedes agregar más detalles si lo deseas */}
    </section>
  )
}
