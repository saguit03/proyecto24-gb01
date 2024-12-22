import React from 'react'
import CardChapter from './CardChapter'

export default function ListCardChapters({listChapters}) {
  return (
          <div className="mt-4">
                          <h4>Lista de Capitulos</h4>
                          <div className="list-group">
                              {listChapters.map((chapter) => (
                                  <CardChapter chapter={chapter}/>
                              ))}
                          </div>
                      </div>
        )
}
