import React from 'react'

export default function CardChapter({chapter}) {
  return (
    <div>
        <h2>{chapter.title}</h2>
        <p>Duracion: {chapter.duration}</p>
        <p>Numero: {chapter.chapterNumber}</p>
        <p>URL del video: {chapter.urlVideo}</p>
    </div>
  )
}
