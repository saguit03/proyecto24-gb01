import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CardSearchSerie({serie}) {
      const navigate = useNavigate();
  
      const handleClick = () => {
          navigate(`/app/serie/${serie.idSeries}`);
      }
    return (
      <section key={serie.id} className="list-group-item" onClick={handleClick}>
          <strong>{serie.title}</strong><br />
          <small><em>Descripcion:</em> {serie.description}</small><br />
          <small><em>Fecha de estreno:</em> {serie.releaseDate}</small>
          {/* Puedes agregar más detalles si lo deseas */}
      </section>
    )
}
